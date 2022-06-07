import { DOMAINS } from "../constants";
import { Checkbox, CheckboxGroup } from "@chakra-ui/react";
import {
  Input,
  Box,
  Button,
  Heading,
  Stack,
  Text,
  HStack,
} from "@chakra-ui/react";
export default function Filter(props) {
  const { setPublications, publications } = props;
  return (
    <CheckboxGroup
      onChange={(value) => {
        setPublications(
          publications.filter((pub) =>
            value.every((d) => pub.domains.includes(d))
          )
        );
      }}
    >
      <HStack>
        {DOMAINS.map((domain) => (
          <Checkbox
            key={domain}
            value={domain}
            padding={2}
            onChange={(e) => {
              console.log(e.target.value);
            }}
          >
            {domain}
          </Checkbox>
        ))}
      </HStack>
    </CheckboxGroup>
  );
}
