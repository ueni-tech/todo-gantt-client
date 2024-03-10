import { useState }  from "react";

const useIsDisabled = (...formData: string[]) => {

    if (formData.every((data) => data.trim())) {
      return false;
    } else {
      return true;
    }
};

export default useIsDisabled;