import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
  Select,
} from "@chakra-ui/react";

import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { ROLES } from "./constants";

import { useState } from "react";
import { supabase } from "./supabaseClient";

export default function Auth(props) {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [login, setLogin] = useState(false);

  const initData = {
    email: "",
    password: "",
    name: "",
    role: "",
  };

  const handleSignIn = async (e) => {
    try {
      setLoading(true);
      const { user, error } = await supabase.auth.signIn({
        email: data.email,
        password: data.password,
      });
      if (error) throw error;
    } catch (error) {
      alert(error.error_description || error.message);
    } finally {
      setLoading(false);
    }
  };

  const [data, setData] = useState(initData);

  const handleSignUp = async (e) => {
    try {
      setLoading(true);
      const { user, error } = await supabase.auth.signUp(
        {
          email: data.email,
          password: data.password,
        },
        {
          data: {
            name: data.name,
            role: data.role,
          },
        }
      );
      if (error) throw error;
    } catch (error) {
      alert(error.error_description || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {login ? (
        <Flex minH={"100vh"} align={"center"} justify={"center"}>
          <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
            <Stack align={"center"}>
              <Heading fontSize={"3xl"}>Login</Heading>
              <Text fontSize={"lg"} color={"gray.600"}>
                to explore research publications.
              </Text>
            </Stack>
            <Box rounded={"lg"} boxShadow={"2xl"} p={8}>
              <Stack spacing={6}>
                <FormControl id="email" isRequired>
                  <FormLabel>Email address</FormLabel>
                  <Input
                    type="email"
                    onChange={(e) =>
                      setData({ ...data, email: e.target.value })
                    }
                  />
                </FormControl>

                <FormControl id="password" isRequired>
                  <FormLabel>Password</FormLabel>
                  <InputGroup>
                    <Input
                      type={showPassword ? "text" : "password"}
                      onChange={(e) =>
                        setData({ ...data, password: e.target.value })
                      }
                    />
                    <InputRightElement h={"full"}>
                      <Button
                        variant={"ghost"}
                        onClick={() =>
                          setShowPassword((showPassword) => !showPassword)
                        }
                      >
                        {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                </FormControl>

                <Stack spacing={10}>
                  {/* <Stack
                direction={{ base: "column", sm: "row" }}
                align={"start"}
                justify={"space-between"}
              >
                <Checkbox>Remember me</Checkbox>
                <Link color={"blue.400"}>Forgot password?</Link>
              </Stack> */}
                  <Button
                    bg={"blue.400"}
                    color={"white"}
                    _hover={{
                      bg: "blue.500",
                    }}
                    onClick={handleSignIn}
                  >
                    Login
                  </Button>
                </Stack>
                <Stack pt={6}>
                  <Text align={"center"}>
                    New user?{" "}
                    <Link color={"blue.400"} onClick={(_) => setLogin(false)}>
                      Sign Up
                    </Link>
                  </Text>
                </Stack>
              </Stack>
            </Box>
          </Stack>
        </Flex>
      ) : (
        <Flex minH={"100vh"} align={"center"} justify={"center"}>
          <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
            <Stack align={"center"}>
              <Heading fontSize={"3xl"}>Sign Up</Heading>
              <Text fontSize={"lg"} color={"gray.600"}>
                to create a new account on RPMS.
              </Text>
            </Stack>
            <Box rounded={"lg"} boxShadow={"2xl"} p={8}>
              <Stack spacing={6}>
                <FormControl id="name" isRequired>
                  <FormLabel>Name</FormLabel>
                  <Input
                    onChange={(e) => setData({ ...data, name: e.target.value })}
                  />
                </FormControl>

                <FormControl id="role" isRequired>
                  <FormLabel>Role</FormLabel>

                  <Select
                    placeholder="Select an option"
                    onChange={(e) => setData({ ...data, role: e.target.value })}
                  >
                    {ROLES.map((role) => (
                      <option value={role}>{role}</option>
                    ))}
                  </Select>
                </FormControl>

                <FormControl id="email" isRequired>
                  <FormLabel>Email address</FormLabel>
                  <Input
                    type="email"
                    onChange={(e) =>
                      setData({ ...data, email: e.target.value })
                    }
                  />
                </FormControl>

                <FormControl id="password" isRequired>
                  <FormLabel>Password</FormLabel>
                  <InputGroup>
                    <Input
                      type={showPassword ? "text" : "password"}
                      onChange={(e) =>
                        setData({ ...data, password: e.target.value })
                      }
                    />
                    <InputRightElement h={"full"}>
                      <Button
                        variant={"ghost"}
                        onClick={() =>
                          setShowPassword((showPassword) => !showPassword)
                        }
                      >
                        {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                </FormControl>

                <Stack spacing={10}>
                  {/* <Stack
                direction={{ base: "column", sm: "row" }}
                align={"start"}
                justify={"space-between"}
              >
                <Checkbox>Remember me</Checkbox>
                <Link color={"blue.400"}>Forgot password?</Link>
              </Stack> */}
                  <Button
                    bg={"blue.400"}
                    color={"white"}
                    _hover={{
                      bg: "blue.500",
                    }}
                    onClick={handleSignUp}
                  >
                    Sign Up
                  </Button>
                </Stack>
                <Stack pt={6}>
                  <Text align={"center"}>
                    Already a user?{" "}
                    <Link color={"blue.400"} onClick={(_) => setLogin(true)}>
                      Login
                    </Link>
                  </Text>
                </Stack>
              </Stack>
            </Box>
          </Stack>
        </Flex>
      )}
    </>
  );
}
