import React, { createContext, useContext, useState } from "react";
import { FormField } from "../types/formField"; // adjust path as needed

type FormConfigContextType = {
  formConfig: FormField[];
  setFormConfig: (fields: FormField[]) => void;
};

const FormConfigContext = createContext<FormConfigContextType | undefined>(undefined);

export const FormConfigProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [formConfig, setFormConfig] = useState<FormField[]>([]);

  return (
    <FormConfigContext.Provider value={{ formConfig, setFormConfig }}>
      {children}
    </FormConfigContext.Provider>
  );
};

export const useFormConfig = () => {
  const context = useContext(FormConfigContext);
  if (!context) {
    throw new Error("useFormConfig must be used within a FormConfigProvider");
  }
  return context;
};
