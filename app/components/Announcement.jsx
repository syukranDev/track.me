import React from 'react'
import { Link, Callout,  } from "@radix-ui/themes"
import { LuBadgeInfo } from "react-icons/lu";

const Announcement = () => {
  return (
    <Callout.Root>
        <Callout.Icon>
            <LuBadgeInfo  />
        </Callout.Icon>
        <Callout.Text>
            <Link href="/">track.me</Link> is still in development phase, more features incoming.
        </Callout.Text>
    </Callout.Root>
  )
}

export default Announcement