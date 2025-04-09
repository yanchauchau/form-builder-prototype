// JSONExportButton.jsx
import { Button } from "@chakra-ui/react";
import { RiDownload2Line } from "react-icons/ri";
import { useForm } from "react-hook-form";

const JSONExportButton = ({ getValues }) => {
  const generateJSON = () => {
    // Get the current form values
    const formData = getValues();
    const jsonData = JSON.stringify(formData, null, 2); // Pretty print the JSON
    console.log("Generated JSON:", jsonData);
    return jsonData;
  };

  const downloadJSON = () => {
    const jsonData = generateJSON();
    const blob = new Blob([jsonData], { type: 'application/json' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'form_data.json'; // Set the filename for download
    link.click();
  };

  return (
    <Button onClick={downloadJSON} variant="outline" colorPalette="blue" size="xs">
     <RiDownload2Line/> Download
    </Button>
  );
};

export default JSONExportButton;
