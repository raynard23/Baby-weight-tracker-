// import { divide } from 'cypress/types/lodash'
import Router from "next/router";
import { useRouter } from "next/router";
import Head from "next/head";
import {
  Container,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Button,
  Flex,
  Textarea,
  Center,
} from "@chakra-ui/react";
import { Avatar, AvatarGroup } from "@chakra-ui/avatar";
import { useState } from "react";
import { prisma } from "@prisma/client";
import axios from "axios";
import { useForm } from "react-hook-form";
import Header from "../components/header";
// import { data } from "cypress/types/jquery";

export default function Home() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isSubmitting, touchedFields, submitCount },
  } = useForm();

  const [weight, setWeight] = useState("");
  let lbs = Math.floor(weight / 453.592);
  let oz = Math.round(weight / 453.592 - lbs) * 16;
  let bio = `your baby is ${Math.floor(weight / 453.592)} lbs and ${Math.round(
    (weight / 453.592 - Math.floor(weight / 453.592)) * 16
  )} oz`;
  // console.log("weight", weight);
  const onSubmit = async (data, e) => {
    const postData = {
      name: data.name,
      age: data.birthday,
      weight: parseInt(data.weight),
      bio: `baby is ${Math.floor(data.weight / 453.592)} lbs  ${Math.round(
        (data.weight / 453.592 - Math.floor(data.weight / 453.592)) * 16
      )} oz`,
      // date: new Date(),
    };
    setWeight(data.weight);

    await axios
      // axios is a library that makes it easy to make HTTP requests  from the browser  or from node.JSON
      .post("/api/postBaby", postData)
      .then(router.push("/getBaby"));
  };

  return (
    <div>
      <Header />

      <Container
        mt={"10rem"}
        maxW="75%"
        bg="gray.100"
        hv="100"
        // maxHeight="150hv"
        rounded={"lg"}
        centerContent
      >
        <Avatar mt={"2rem"} size="2xl" src="" />
        <form
          mt={"2rem"}
          mb={"2rem"}
          onSubmit={(e) => {
            handleSubmit(onSubmit)(e).catch((error) => {
              console.log("error", error);
              ("somthing is not working");
            });
          }}
        >
          <FormControl id="name" isInvalid={errors.name}>
            <FormLabel>Name</FormLabel>
            <Input
              sz="lg"
              id="name"
              placeholder="name"
              {...register("name", {
                required: "This is required",
                minLength: { value: 4, message: "Minimum length should be 4" },
              })}
            />
            <FormLabel>Birthday</FormLabel>
            <Input
              type="date"
              sz="lg"
              id="birthday"
              placeholder="name"
              {...register("birthday", {
                required: "This is required",
                minLength: { value: 4, message: "Minimum length should be 4" },
              })}
            />
            <FormLabel>Weight</FormLabel>
            <Input
              onChange={(e) => alert("this is the weight")}
              type="number"
              sz="lg"
              id="weight"
              placeholder="weight in grams"
              {...register("weight", {
                required: "This is required",
                minLength: { value: 2, message: "Minimum length should be 2" },
              })}
            />

            <Input
              type="number"
              sz="lg"
              id="weight"
              placeholder={`${bio}`}
              {...register("bio", `${bio}`)}
            />
            <FormErrorMessage>
              {errors.name && errors.name.message}
            </FormErrorMessage>
            <Center>
              <Button
                onClick={handleSubmit(onSubmit)}
                mt={4}
                flex-dir="center"
                colorScheme="teal"
                isLoading={isSubmitting}
                type="submit"
              >
                Submit
              </Button>
            </Center>
          </FormControl>
        </form>
      </Container>
      {/* <Container> {bio}</Container> */}
    </div>
  );
}
