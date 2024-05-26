import ProductNew from "@/models/ProductNew";
import { OptionClass, Option } from "@/models/Option";
import { OptionValueClass, OptionValue } from "@/models/OptionValue";

const mainAPI = "https://tallorangecat98.conveyor.cloud/api/Option";

const createOption = async (
  option: OptionCreateDto
): Promise<Option | null> => {
  try {
    const response = await fetch(mainAPI, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(option),
    });
    const data = await response.json();
    if (response.ok) {
      return data;
    } else {
      console.error("Error creating option:", data);
      return null;
    }
  } catch (error) {
    console.error("Error creating option:", error);
    return null;
  }
};

const editOption = async (option: OptionCreateDto, optionid: number) => {
  try {
    const response = await fetch(`${mainAPI}/${optionid}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(option),
    });
    console.log(response);
    if (response.ok) {
      var data = await response.json();
      return data;
    } else {
      console.error("Error updating product:", response);
    }
  } catch (error) {
    console.error("Error updating product:", error);
    return null;
  }
};

const deleteOption = async (optionid: number): Promise<boolean> => {
  try {
    const response = await fetch(`${mainAPI}/${optionid}`, {
      method: "DELETE",
    });
    if (response.ok) {
      return true;
    } else {
      console.error("Error deleting option:", response);
      return false;
    }
  } catch (error) {
    console.error("Error deleting option:", error);
    return false;
  }
};

export { createOption, editOption, deleteOption };
