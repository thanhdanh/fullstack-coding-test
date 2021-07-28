import { Heading } from "@chakra-ui/react";
import React, { forwardRef, Ref, useImperativeHandle, useState } from "react";

export interface IDynamicTextComp {
  changeValue: (text: string) => void
}

const DynamicText = (_, ref: Ref<IDynamicTextComp>) => {
  const [value, setValue] = useState("Random Text");

  const changeValue = (newValue: string) => {
    setValue(newValue);
  };

  useImperativeHandle(ref, () => ({
      changeValue
    })
  )

  return <Heading as="h1" size="lg" maxW='500'>{value}</Heading>;
};

export default forwardRef<IDynamicTextComp>(DynamicText);
