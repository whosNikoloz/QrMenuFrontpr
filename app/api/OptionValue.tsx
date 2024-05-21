import ProductNew from "@/models/ProductNew";
import { OptionClass, Option } from "@/models/Option";
import { OptionValueClass, OptionValue } from "@/models/OptionValue";

const mainAPI = "https://localhost:44380/api/OptionValue";

const createOptionValue = async (
  option: OptionValueCreateDto
): Promise<OptionValue | null> => {
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

const editOptionValue = async (
  option: OptionValueCreateDto,
  OptionValueId: number
) => {
  try {
    const response = await fetch(`${mainAPI}/${OptionValueId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(option),
    });
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

const deleteOptionValue = async (optionValueid: number): Promise<boolean> => {
  try {
    const response = await fetch(`${mainAPI}/${optionValueid}`, {
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

export { createOptionValue, editOptionValue, deleteOptionValue };
