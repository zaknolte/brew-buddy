// 'use client'

import React from "react";
import { useSession } from "next-auth/react";

export default function homePage() {
    const { data: session, status } = useSession();
    console.log(session)
    return(
        <div>
            Home page here {session?.user.email}
        </div>
    )
}