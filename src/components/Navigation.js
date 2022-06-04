import {
  Box,
  Flex,
  Avatar,
  HStack,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Heading,
} from "@chakra-ui/react";
import { NavLink, Link } from "react-router-dom";
import { supabase } from "../supabaseClient";

const LINKS = [
  { name: "Dashboard", link: "/" },
  { name: "Explore", link: "/explore" },
];

export default function Navigation() {
  async function handleSignOut() {
    await supabase.auth.signOut();
  }
  return (
    <>
      <Box bg={"blue.400"} px={8}>
        <Flex
          h={16}
          alignItems={"center"}
          justifyContent={"space-between"}
          color="white"
        >
          <HStack spacing={8} alignItems={"center"}>
            <Heading as={"h1"} size={"lg"} mx={4}>
              {" "}
              RPMS{" "}
            </Heading>
            <HStack
              as={"nav"}
              spacing={4}
              display={{ base: "none", md: "flex" }}
            >
              {LINKS.map((link, index) => (
                <NavLink key={index} to={link.link}>
                  {link.name}
                </NavLink>
              ))}
              {supabase.auth.user().user_metadata.role === "ADMIN" ? (
                <NavLink to="/admin">Admin</NavLink>
              ) : (
                <></>
              )}
            </HStack>
          </HStack>
          <Flex alignItems={"center"}>
            <Menu>
              <MenuButton
                as={Button}
                rounded={"full"}
                variant={"link"}
                cursor={"pointer"}
                minW={0}
              >
                <Avatar size={"sm"} />
              </MenuButton>
              <MenuList color="black">
                <MenuItem>
                  <Link to="/profile">Profile</Link>
                </MenuItem>
                <MenuItem onClick={handleSignOut}>Sign Out</MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </Flex>
      </Box>
    </>
  );
}
