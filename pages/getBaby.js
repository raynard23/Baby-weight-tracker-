import { useRouter } from "next/router";
import Head from "next/head";
import { Avatar, omitThemingProps } from "@chakra-ui/react";
import moment from "moment";
import {
  Container,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Button,
  Flex,
  Textarea,
  Box,
  Center,
} from "@chakra-ui/react";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";

import { useEffect, useState } from "react";
import { prisma } from "@prisma/client";
import axios from "axios";
import Header from "../components/header";

export default function Home() {
  const router = useRouter();
  const [babyData, setBabyData] = useState([]);
  useEffect(() => {
    axios.get("/api/baby").then((res) => {
      const data = res.data;
      setBabyData(data);
    });
  }, []);
  let name = babyData[0]?.name;
  // let date = moment(babyData[0]?.date.split("T")[0], "YYYY-MM-DD").format(
  //   "MMM DD YYYY"
  // );
  let date = babyData[0]?.date.split("T")[0];
  let time = moment(
    babyData[0]?.date.split("T")[1].toString(),
    "HH:mm:ss"
  ).format("hh:mm a");
  console.log(
    babyData.map((baby) => {
      return moment(baby.date.split("T")[0].toString()).format("MMM DD YYYY");
    })
  );
  let bio = babyData[0]?.bio;
  let weight = babyData.map((baby, index) => {
    return (
      <div key={index}>
        <FormLabel> {baby.bio}</FormLabel>
      </div>
    );
  });
  let weightInGram = babyData.map((baby, index) => {
    return (
      <div key={index}>
        {" "}
        <FormLabel>{baby.weight}</FormLabel>
      </div>
    );
  });
  let dates = babyData.map((baby) => {
    return (
      <div>
        <FormLabel>
          {moment(baby.date.split("T")[0].toString()).format("MMM DD YYYY")}
        </FormLabel>
      </div>
    );
  });

  return (
    <div>
      <Header />

      <Container
        mt={"5rem"}
        maxH="100%"
        maxW="container.sm"
        bg="gray.100"
        rounded={"md"}
        centerContent
      >
        <Avatar mt={"2rem"} size="2xl" name={name} src="" />
        <Center mt={"1rem"}>
          <h1>
            <strong>{name}</strong>
          </h1>
        </Center>
        <Center>
          <TableContainer mt={"2rem"} mb={"1rem"}>
            <Table size="sm">
              <Thead>
                <Tr>
                  <Th>Dates</Th>

                  <Th>Weight</Th>
                  <Th>Grams</Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td>{dates}</Td>

                  <Td>{weight}</Td>
                  <Td>{weightInGram} </Td>
                </Tr>
              </Tbody>
            </Table>
          </TableContainer>
        </Center>
        <Button
          onClick={() => {
            router.push("/");
          }}
          colorScheme="teal"
          mt="2rem"
          mb={"2rem"}
          flex-dir="center"
          ml={"1"}
        >
          Add updated informaton
        </Button>
      </Container>
    </div>
  );
}
