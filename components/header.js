import React from "react";
import { Flex, Heading } from "@chakra-ui/react";
import { signIn, signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { Avatar } from "@chakra-ui/avatar";
import { Image } from "@chakra-ui/image";
import { useRouter } from "next/router";
export default function Header() {
  const { data: session, status } = useSession();
  // console.log("sessin", session, "id", session?.user?.image);
  {
  }

  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding="1.5rem"
      bg="teal.500"
      color="white"
    >
      <Flex align="center" mr={5}>
        <Heading as="h1" size="lg" letterSpacing={"-.1rem"}>
          <a href="http://localhost:3000/">My Baby Tracker</a>
        </Heading>
        {/*  these are the links to the pages to sign in and out with next auth  */}

        <ul style={{ paddingLeft: "2rem", listStyle: "none" }}>
          {/* using a condidtion to render the sign in or out buttons  */}
          {!session && status == "unauthenticated" && (
            <li>
              <Link href="/api/auth/signin" legacyBehavior>
                <a
                  onClick={(e) => {
                    e.preventDefault();
                    signIn();
                  }}
                >
                  Sign In
                </a>
              </Link>
            </li>
          )}

          {session && status == "authenticated" && (
            // using a condition to render the sign in or out buttons
            <ul>
              <li>
                <Link href="/api/auth/signout" legacyBehavior>
                  <a
                    onClick={(e) => {
                      e.preventDefault();
                      signOut();
                    }}
                  >
                    Sign Out
                  </a>
                </Link>
              </li>

              <li>
                <Link href="/getBaby" legacyBehavior>
                  Baby Info
                </Link>
              </li>
            </ul>
          )}
        </ul>
      </Flex>

      <Image
        borderRadius="full"
        boxSize="50px"
        src={session?.user?.image}
        alt={session?.user?.name}
        legacyBehavior
      />
    </Flex>
  );
}
