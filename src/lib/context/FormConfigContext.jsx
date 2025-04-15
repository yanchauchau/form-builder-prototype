import React, { createContext, useState, useContext } from "react";

const FormConfigContext = createContext();

export const FormConfigProvider = ({ children }) => {
  const [formConfig, setFormConfig] = useState({
    fields: [
      {
        id: "question-1",
        type: "new-question-text",
        questionText: "What is your favorite color?",
        order: 1,
        textResponse: "What is your favorite color?",
        questionOptions: ["Dog", "Cat", "Bird"],
        required: true,
      },
    ],
  });

  return (
    <FormConfigContext.Provider value={{ formConfig, setFormConfig }}>
      {children}
    </FormConfigContext.Provider>
  );
};

export function useFormConfig() {
  const context = useContext(FormConfigContext);
  if (!context) {
    throw new Error("useFormConfig must be used within a FormConfigProvider");
  }
  return context;
}


export const getNewQuestionTemplate = (order) => ({
  id: Date.now(),
  type: "new-question-text",
        questionText: "What is your favorite color?",
        order,
        textResponse: "What is your favorite color?",
        questionOptions: ["Dog", "Cat", "Bird"],
        required: true,    
});

