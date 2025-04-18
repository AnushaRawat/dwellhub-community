
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

export function ProfileHeader() {
  const { user } = useAuth();
  const [profileData, setProfileData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    role: "Tenant",
    joinDate: "",
    avatar: "/placeholder.svg",
    bio: "",
    societyName: "",
    flatNumber: ""
  });

  useEffect(() => {
    if (user) {
      // Fetch user profile data from Supabase
      const fetchProfileData = async () => {
        try {
          // Get basic user info from user_profiles
          const { data: initialProfileData, error: profileError } = await supabase
            .from('user_profiles')
            .select('*, societies(name)')
            .eq('id', user.id)
            .single();

          let finalProfileData = initialProfileData;

          if (profileError) {
            console.error("Error fetching profile:", profileError);
            
            // Fallback to profiles table if user_profiles doesn't have data
            const { data: oldProfileData, error: oldProfileError } = await supabase
              .from('profiles')
              .select('*')
              .eq('id', user.id)
              .single();
              
            if (oldProfileError) throw oldProfileError;
            
            // Use old profiles data
            finalProfileData = oldProfileData;
          }

          // Get role info
          const { data: roleData, error: roleError } = await supabase
            .from('user_roles')
            .select('role')
            .eq('user_id', user.id)
            .maybeSingle();

          if (roleError) console.error("Error fetching role:", roleError);

          // Format join date
          const joinDate = new Date(user.created_at || Date.now());
          const formattedDate = joinDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long' });

          setProfileData({
            firstName: finalProfileData?.first_name || user?.user_metadata?.first_name || "",
            lastName: finalProfileData?.last_name || user?.user_metadata?.last_name || "",
            email: user.email || "",
            role: roleData?.role ? (roleData.role.charAt(0).toUpperCase() + roleData.role.slice(1)) : "Tenant",
            joinDate: formattedDate,
            avatar: finalProfileData?.avatar_url || "/placeholder.svg",
            bio: finalProfileData?.bio || user?.user_metadata?.bio || "",
            societyName: finalProfileData?.societies?.name || "",
            flatNumber: finalProfileData?.flat_number || ""
          });
        } catch (error) {
          console.error("Error fetching profile data:", error);
        }
      };

      fetchProfileData();
    }
  }, [user]);

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row gap-6 items-start">
          <Avatar className="h-20 w-20 border-2 border-primary/10">
            <AvatarImage src={profileData.avatar} alt={`${profileData.firstName} ${profileData.lastName}`} />
            <AvatarFallback className="text-lg">{profileData.firstName.charAt(0)}{profileData.lastName.charAt(0)}</AvatarFallback>
          </Avatar>
          
          <div className="space-y-2">
            <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
              <h1 className="text-2xl font-bold">{profileData.firstName} {profileData.lastName}</h1>
              <Badge variant="outline" className="w-fit text-xs">
                ID: {user?.id?.substring(0, 8) || ""}
              </Badge>
              <Badge variant="secondary" className="w-fit">
                {profileData.role}
              </Badge>
            </div>
            
            <p className="text-muted-foreground">{profileData.email}</p>
            <p className="text-sm text-muted-foreground">Member since {profileData.joinDate}</p>
            
            {profileData.societyName && (
              <p className="text-sm">
                <span className="font-medium">Society:</span> {profileData.societyName}
                {profileData.flatNumber && ` • Flat: ${profileData.flatNumber}`}
              </p>
            )}
            
            {profileData.bio && <p className="text-sm mt-2">{profileData.bio}</p>}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
