// import React from "react";
import {Avatar, AvatarGroup} from "@/components/ClientNextUI"
// import {api} from "@/trpc/server";
import { getEventAttendeePreview } from "@/app/dynamicEdgeFunctions";
interface AvatarGroupProps {
    maxDisplay: number;
    eventid: string;
}
export default async function App({maxDisplay, eventid}: AvatarGroupProps) {



  const attending = await getEventAttendeePreview(eventid)
  const attendingCount = attending.countConfirmed
  const rsvpCount = attending.countRsvpd
  const attendingUsers:{
      user: {
          name: string | null;
          image: string | null;
      };
  }[]= attending.firstTenConfirmed

  const rsvpUsers:{
      user: {
          name: string | null;
          image: string | null;
      };
  }[]= attending.firstTenRsvpd

  const testMax = 43

  const max = attendingCount + rsvpCount
  const totalusers = attendingUsers.concat(rsvpUsers)

  const TestUsers:{
      user: {
          name: string | null;
          image: string | null;
      };
  }[] = [
      {
          user: {
              name: "John Doe",
              image: "https://cdn.discordapp.com/avatars/216245834814193674/08f1fa14efeaf76b3d67115f6a0d2960.png"
          }
      },
      {
          user: {
              name: "John Doe",
              image: "https://cdn.discordapp.com/avatars/216245834814193674/08f1fa14efeaf76b3d67115f6a0d2960.png"
          }
      },
      {
          user: {
              name: "John Doe",
              image: "https://cdn.discordapp.com/avatars/216245834814193674/08f1fa14efeaf76b3d67115f6a0d2960.png"
          }
      },
      {
          user: {
              name: "John Doe",
              image: "https://cdn.discordapp.com/avatars/216245834814193674/08f1fa14efeaf76b3d67115f6a0d2960.png"
          }
      },
      {
          user: {
              name: "John Doe",
              image: "https://cdn.discordapp.com/avatars/216245834814193674/08f1fa14efeaf76b3d67115f6a0d2960.png"
          }
      },
      {
          user: {
              name: "John Doe",
              image: "https://cdn.discordapp.com/avatars/216245834814193674/08f1fa14efeaf76b3d67115f6a0d2960.png"
          }
      },
      {
          user: {
              name: "John Doe",
              image: "https://cdn.discordapp.com/avatars/216245834814193674/08f1fa14efeaf76b3d67115f6a0d2960.png"
          }
      },
      {
          user: {
              name: "John Doe",
              image: "https://cdn.discordapp.com/avatars/216245834814193674/08f1fa14efeaf76b3d67115f6a0d2960.png"
          }
      },
      {
          user: {
              name: "John Doe",
              image: "https://cdn.discordapp.com/avatars/216245834814193674/08f1fa14efeaf76b3d67115f6a0d2960.png"
          }
      },
      {
          user: {
              name: "John Doe",
              image: "https://cdn.discordapp.com/avatars/216245834814193674/08f1fa14efeaf76b3d67115f6a0d2960.png"
          }
      },
      {
          user: {
              name: "John Doe",
              image: "https://cdn.discordapp.com/avatars/216245834814193674/08f1fa14efeaf76b3d67115f6a0d2960.png"
          }
      },
      {
          user: {
              name: "John Doe",
              image: "https://cdn.discordapp.com/avatars/216245834814193674/08f1fa14efeaf76b3d67115f6a0d2960.png"
          }
      },
      {
          user: {
              name: "John Doe",
              image: "https://cdn.discordapp.com/avatars/216245834814193674/08f1fa14efeaf76b3d67115f6a0d2960.png"
          }
      },
      {
          user: {
              name: "John Doe",
              image: "https://cdn.discordapp.com/avatars/216245834814193674/08f1fa14efeaf76b3d67115f6a0d2960.png"
          }
      },
      {
          user: {
              name: "John Doe",
              image: "https://cdn.discordapp.com/avatars/216245834814193674/08f1fa14efeaf76b3d67115f6a0d2960.png"
          }
      },
      {
          user: {
              name: "John Doe",
              image: "https://cdn.discordapp.com/avatars/216245834814193674/08f1fa14efeaf76b3d67115f6a0d2960.png"
          }
      },
      {
          user: {
              name: "John Doe",
              image: "https://cdn.discordapp.com/avatars/216245834814193674/08f1fa14efeaf76b3d67115f6a0d2960.png"
          }
      },
      {
          user: {
              name: "John Doe",
              image: "https://cdn.discordapp.com/avatars/216245834814193674/08f1fa14efeaf76b3d67115f6a0d2960.png"
          }
      },
      {
          user: {
              name: "John Doe",
              image: "https://cdn.discordapp.com/avatars/216245834814193674/08f1fa14efeaf76b3d67115f6a0d2960.png"
          }
      },
      {
          user: {
              name: "John Doe",
              image: "https://cdn.discordapp.com/avatars/216245834814193674/08f1fa14efeaf76b3d67115f6a0d2960.png"
          }
      },
      {
          user: {
              name: "John Doe",
              image: "https://cdn.discordapp.com/avatars/216245834814193674/08f1fa14efeaf76b3d67115f6a0d2960.png"
          }
      },
      {
          user: {
              name: "John Doe",
              image: "https://cdn.discordapp.com/avatars/216245834814193674/08f1fa14efeaf76b3d67115f6a0d2960.png"
          }
      },
      {
          user: {
              name: "John Doe",
              image: "https://cdn.discordapp.com/avatars/216245834814193674/08f1fa14efeaf76b3d67115f6a0d2960.png"
          }
      },
      {
          user: {
              name: "John Doe",
              image: "https://cdn.discordapp.com/avatars/216245834814193674/08f1fa14efeaf76b3d67115f6a0d2960.png"
          }
      },
      {
          user: {
              name: "John Doe",
              image: "https://cdn.discordapp.com/avatars/216245834814193674/08f1fa14efeaf76b3d67115f6a0d2960.png"
          }
      },
      {
          user: {
              name: "John Doe",
              image: "https://cdn.discordapp.com/avatars/216245834814193674/08f1fa14efeaf76b3d67115f6a0d2960.png"
          }
      },
      {
          user: {
              name: "John Doe",
              image: "https://cdn.discordapp.com/avatars/216245834814193674/08f1fa14efeaf76b3d67115f6a0d2960.png"
          }
      },
      {
          user: {
              name: "John Doe",
              image: "https://cdn.discordapp.com/avatars/216245834814193674/08f1fa14efeaf76b3d67115f6a0d2960.png"
          }
      },
      {
          user: {
              name: "John Doe",
              image: "https://cdn.discordapp.com/avatars/216245834814193674/08f1fa14efeaf76b3d67115f6a0d2960.png"
          }
      },
      {
          user: {
              name: "John Doe",
              image: "https://cdn.discordapp.com/avatars/216245834814193674/08f1fa14efeaf76b3d67115f6a0d2960.png"
          }
      },
      {
          user: {
              name: "John Doe",
              image: "https://cdn.discordapp.com/avatars/216245834814193674/08f1fa14efeaf76b3d67115f6a0d2960.png"
          }
      },
      {
          user: {
              name: "John Doe",
              image: "https://cdn.discordapp.com/avatars/216245834814193674/08f1fa14efeaf76b3d67115f6a0d2960.png"
          }
      },
      {
          user: {
              name: "John Doe",
              image: "https://cdn.discordapp.com/avatars/216245834814193674/08f1fa14efeaf76b3d67115f6a0d2960.png"
          }
      },
      {
          user: {
              name: "John Doe",
              image: "https://cdn.discordapp.com/avatars/216245834814193674/08f1fa14efeaf76b3d67115f6a0d2960.png"
          }
      },
      {
          user: {
              name: "John Doe",
              image: "https://cdn.discordapp.com/avatars/216245834814193674/08f1fa14efeaf76b3d67115f6a0d2960.png"
          }
      },
      {
          user: {
              name: "John Doe",
              image: "https://cdn.discordapp.com/avatars/216245834814193674/08f1fa14efeaf76b3d67115f6a0d2960.png"
          }
      },
      {
          user: {
              name: "John Doe",
              image: "https://cdn.discordapp.com/avatars/216245834814193674/08f1fa14efeaf76b3d67115f6a0d2960.png"
          }
      },
      {
          user: {
              name: "John Doe",
              image: "https://cdn.discordapp.com/avatars/216245834814193674/08f1fa14efeaf76b3d67115f6a0d2960.png"
          }
      },
      {
          user: {
              name: "John Doe",
              image: "https://cdn.discordapp.com/avatars/216245834814193674/08f1fa14efeaf76b3d67115f6a0d2960.png"
          }
      },
      {
          user: {
              name: "John Doe",
              image: "https://cdn.discordapp.com/avatars/216245834814193674/08f1fa14efeaf76b3d67115f6a0d2960.png"
          }
      },
  ]




  return (

      <AvatarGroup
        total={testMax}
        className="overflow-visible z-10 -translate-y-7 "
        size="lg"
        isBordered max={5}>
          {TestUsers.map((item) => (
            <Avatar 
            key={item.user.name as string}
            src={item.user.image as string}
            alt={item.user.name ? item.user.name : "user"}
            />
            ))}
      </AvatarGroup>

  );
}
