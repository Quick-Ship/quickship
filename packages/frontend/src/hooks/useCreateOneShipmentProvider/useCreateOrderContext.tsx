"use client";

import { useContext } from "react";
import {
  CreateOrderContext,
  CreateOrderContextType,
} from "./CreateOrderProvider";

export const useCreateOrderContext = (): CreateOrderContextType => {
  const context = useContext(CreateOrderContext);
  if (!context) {
    throw new Error("useCreateContext must be within a CreateOrderProvider");
  }
  return context;
};
