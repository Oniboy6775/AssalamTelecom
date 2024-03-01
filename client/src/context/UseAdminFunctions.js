import { useGlobalContext } from "./UserContext";
import { toast } from "react-toastify";

import { START_LOADING, STOP_LOADING, UPDATE_SERVICE_SUCCESS } from "./actions";

const useAdminFunctions = () => {
  const { state, dispatch } = useGlobalContext();
  const updateService = async () => {
    const { selectedAvailability, selectedProduct, selectedServiceType } =
      state;
    dispatch({ type: START_LOADING });
    try {
      // const { data } = await authFetch.post("/admin/updateServices", {
      //   serviceName: selectedProduct,
      //   serviceType: selectedServiceType,
      //   serviceStatus: selectedAvailability,
      // });
      // dispatch({ type: UPDATE_SERVICE_SUCCESS });
      // toast.success(data.msg);
    } catch (error) {
      dispatch({ type: STOP_LOADING });
    }
  };
  return {
    updateService,
  };
};

export default useAdminFunctions;
