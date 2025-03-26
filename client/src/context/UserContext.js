import React, { useContext, useReducer, useState } from "react";
import reducer from "./reducer";
import axios from "axios";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { initialState } from "./initialState";
// import useAdminFunctions from "./UseAdminFunctions";
const {
  FETCH_ADMIN_SUCCESS,
  UPDATE_SERVICE_SUCCESS,
  SETUP_USER_SUCCESS,
  HANDLE_CHANGE,
  LOGOUT_USER,
  HANDLE_DATA_OPTION_CHANGE,
  BUY_DATA_SUCCESS,
  BUY_AIRTIME_SUCCESS,
  UPGRADE_USER_SUCCESS,
  START_LOADING,
  STOP_LOADING,
  REQUEST_PASSWORD_RESET_SUCCESS,
  RESET_PASSWORD_SUCCESS,
  CHANGE_PAGE,
  FILTER_TRANSACTION_BEGIN,
  FILTER_TRANSACTION_SUCCESS,
  CLEAR_FILTER,
  VALIDATE_SUCCESS,
  TRANSFER_FUND_SUCCESS,
  CHANGE_PASSWORD_SUCCESS,
  GENERATE_COUPON_SUCCESS,
  SEND_MAIL_SUCCESS,
  FETCH_USER_SUCCESS,
  BUY_ELECTRICITY_SUCCESS,
  SELECTED_DATA_CHANGE,
  FUND_WALLET_COUPON,
  INITIATE_PAYMENT_SUCCESS,
  UPDATE_SUPPLIER_SUCCESS,
  FETCH_SUPPLIER_SUCCESS,
  CHECK_SERVICES_SUCCESS,
  FETCH_BANK_CODES_SUCCESS,
  WITHDRAWAL_SUCCESS,
  ACCOUNT_NUMBER_VALIDATE_SUCCESS,
  GET_NOTIFICATION_SUCCESS,
  CLEAR_NOTIFICATION,
  FETCH_CONTACT_SUCCESS,
  ADD_CONTACT_SUCCESS,
  DELETE_CONTACT_SUCCESS,
  FETCH_BENEFICIARY_SUCCESS,
  FETCH_REFERRAL_LIST_SUCCESS,
  CHANGE_DATA_TYPE_OPTION,
  FETCH_COST_AND_SUPPLIER_SUCCESS,
  FETCH_AVAILABLE_PLANS,
} = require("./actions");

const AppContext = React.createContext();

export const AppProvider = ({ children }) => {
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);

  const navigate = useNavigate();
  // const { updateService } = useAdminFunctions();

  const [state, dispatch] = useReducer(reducer, initialState);

  // axios
  const authFetch = axios.create({
    baseURL: "/api/v1",
  });
  // request;

  authFetch.interceptors.request.use(
    (config) => {
      config.headers.common["x-auth-token"] = state.token;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  // response;

  authFetch.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      console.log(error.response);
      if (error.response.status === 401) {
        logoutUser();
      }
      return Promise.reject(error);
    }
  );
  const toggleSideBar = () => {
    setIsSideBarOpen(!isSideBarOpen);
  };
  const toggleNav = () => dispatch({ type: "TOGGLE_NAV" });

  // LOCAL STORAGE
  const addUserToLocalStorage = ({ user, token }) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
  };
  const removeUserFromLocalStorage = () => {
    localStorage.removeItem("token");
    // localStorage.removeItem("user");
    localStorage.setItem("user", null);
  };
  // LOGOUT
  const logoutUser = () => {
    removeUserFromLocalStorage();
    dispatch({ type: LOGOUT_USER, payload: initialState });
  };
  // get notification

  // HANDLE CHANGE

  useEffect(() => {
    let currentPlan = state.dataOptions.filter((e = []) => {
      return e.split(" ")[0] === state.selectedNetwork;
    });
    // console.log(currentPlan);
    if (state.selectedNetwork === "MTN") {
      // console.log("It is MTN");
      const specialOptions = [
        "select type",
        ...new Set(currentPlan.map((e) => e.split(" ")[6])),
      ];
      dispatch({ type: CHANGE_DATA_TYPE_OPTION, payload: specialOptions });
      // console.log(specialOptions);
      currentPlan = currentPlan.filter(
        (e) => e.split(" ")[6] === state.selectedDataType
      );
    }
    dispatch({ type: HANDLE_DATA_OPTION_CHANGE, payload: currentPlan });
    // eslint-disable-next-line
  }, [state.selectedNetwork, state.selectedDataType]);
  const getSelectedDataObj = (selectedPlan) => {
    const { selectedNetwork, dataSubScriptions } = state;
    const splittedPlan = selectedPlan.split(" ");
    const chosenPlan = dataSubScriptions.find((e) => {
      let dataVolume = splittedPlan[1];
      // let validity = `${splittedPlan[3]} ${splittedPlan[4]} ${splittedPlan[5]}`;
      let dataType = splittedPlan[splittedPlan.length - 1];

      return (
        e.plan === dataVolume &&
        e.plan_type === dataType &&
        e.plan_network === selectedNetwork
        //  &&
        // e.month_validate === validity
      );
    });
    return chosenPlan;
  };
  useEffect(() => {
    if (state.selectedPlan) {
      const selectedDataObject = getSelectedDataObj(state.selectedPlan);
      // console.log({ selectedDataObject });
      dispatch({ type: SELECTED_DATA_CHANGE, payload: selectedDataObject });
    }
    // eslint-disable-next-line
  }, [state.selectedPlan]);

  const handleChange = ({ name, value }) => {
    dispatch({ type: HANDLE_CHANGE, payload: { name, value } });
  };

  const fetchAdmin = async () => {
    dispatch({ type: START_LOADING });
    try {
      const { data } = await authFetch.get("/admin/");
      dispatch({ type: FETCH_ADMIN_SUCCESS, payload: { adminDetails: data } });
    } catch (error) {
      navigate("/profile");
      dispatch({ type: STOP_LOADING });
    }
    // showAlert();
  };

  const setupUser = async ({ currentUser, endPoint, alertText }) => {
    dispatch({ type: START_LOADING });
    try {
      const { data } = await authFetch.post(`/auth/${endPoint}`, currentUser);
      const {
        user,
        token,
        subscriptionPlans,
        transactions,
        isAdmin,
        isCouponVendor,
      } = data;
      let dataSubScriptions = subscriptionPlans["MTN"]
        .concat(subscriptionPlans["GLO"])
        .concat(subscriptionPlans["AIRTEL"])
        .concat(subscriptionPlans["NMOBILE"]);
      let dataOptions = [];
      dataOptions = dataSubScriptions.map(
        (e) =>
          `${e.plan_network} ${e.plan} ₦${e.plan_amount} ${e.month_validate} ${e.plan_type}`
      );
      dispatch({
        type: SETUP_USER_SUCCESS,
        payload: {
          user,
          token,
          alertText,
          subscriptionPlans,
          isCouponVendor,
          transactions,
          isAdmin,
          dataSubScriptions,
          dataOptions,
          selectedNetwork: dataOptions[0].split(" ")[0],
          selectedPlan: dataOptions[0],
        },
      });
      addUserToLocalStorage({ user, token });
      navigate("/profile");
    } catch (error) {
      if (error.response.data.msg) {
        toast.error(error.response.data.msg);
      } else toast.error("Something went wrong");
      dispatch({
        type: STOP_LOADING,
      });
    }
    // clearAlert();
  };
  const checkLoggedIn = async () => {
    dispatch({ type: START_LOADING });
    try {
      const { data } = await authFetch.post("/auth/isTokenValid");
      if (data) {
        const { data } = await authFetch("/auth");
        let dataSubScriptions = data.subscriptionPlans["MTN"]
          .concat(data.subscriptionPlans["GLO"])
          .concat(data.subscriptionPlans["AIRTEL"])
          .concat(data.subscriptionPlans["NMOBILE"]);
        let dataOptions = [];
        dataOptions = dataSubScriptions.map(
          (e) =>
            `${e.plan_network} ${e.plan} ₦${e.plan_amount} ${e.month_validate} ${e.plan_type}`
        );
        dispatch({
          type: SETUP_USER_SUCCESS,
          payload: {
            ...data,
            dataSubScriptions,
            selectedNetwork: dataOptions[0].split(" ")[0],
            dataOptions,
            selectedPlan: dataOptions[0],
          },
        });
      }
    } catch (error) {
      logoutUser();
    }
  };
  // SERVICES PURCHASE
  const buyData = async ({ phoneNumber, planId, selectedNetwork }) => {
    if (!selectedNetwork || selectedNetwork == "select") {
      toast.warning("Please select a network");
      return;
    }
    dispatch({ type: START_LOADING, payload: "buying data..." });
    let networkId;
    if (selectedNetwork === "MTN") networkId = "1";
    if (selectedNetwork === "AIRTEL") networkId = "3";
    if (selectedNetwork === "GLO") networkId = "2";
    if (selectedNetwork === "9MOBILE") networkId = "6";

    dispatch({ type: START_LOADING, payload: "Buying data..." });
    // console.log(chosenPlan);
    try {
      const { data } = await authFetch.post("/buy/data", {
        network: networkId,
        mobile_number: phoneNumber,
        plan: planId,
      });
      if (state.contactName) addContact({ contactId: "" });
      dispatch({
        type: BUY_DATA_SUCCESS,
        payload: { msg: data.msg, receipt: data.receipt },
      });
      toast.success(data.msg);
      navigate("/profile");
    } catch (error) {
      dispatch({ type: STOP_LOADING });
      // if (!error.response.data.msg) {
      //   navigate("/profile");
      //   toast.error(
      //     "An error occur. kindly confirm your balance before retrying"
      //   );
      // } else toast.error(error.response.data.msg);
      toast.error(
        error.response.data.msg ||
          "An error occur. kindly confirm your balance before retrying the transaction"
      );
    }
  };
  const buyAirtime = async () => {
    dispatch({ type: START_LOADING });
    const { selectedNetwork, phoneNumber, amount } = state;
    let networkId;
    if (selectedNetwork === "MTN") networkId = "1";
    if (selectedNetwork === "GLO") networkId = "2";
    if (selectedNetwork === "AIRTEL") networkId = "3";
    if (selectedNetwork === "9MOBILE") networkId = "4";
    try {
      const { data } = await authFetch.post("/buy/airtime", {
        network: networkId,
        mobile_number: phoneNumber,
        amount: amount,
      });
      if (state.contactName) addContact({ contactId: "" });
      dispatch({
        type: BUY_AIRTIME_SUCCESS,
        payload: { receipt: data.receipt, msg: data.msg },
      });
      toast.success(data.msg);
      navigate("/profile");
    } catch (error) {
      dispatch({ type: STOP_LOADING });
      toast.error(
        error.response.data.msg ||
          "An error occur. kindly confirm your balance before retrying the transaction"
      );
    }
  };

  // OTHERS
  const fundWalletCoupon = async () => {
    dispatch({ type: START_LOADING });
    try {
      const { data } = await authFetch.post("/fundWallet/coupon", {
        userName: state.user.userName,
        coupon: state.couponCode,
      });
      const { msg, amount } = data;
      dispatch({ type: FUND_WALLET_COUPON, payload: { amount } });
      toast.success(msg);
      navigate("/profile");
    } catch (e) {
      toast.error(e.response.data.msg);
      dispatch({ type: STOP_LOADING });
    }
  };
  const updatePrice = async (payload) => {
    dispatch({ type: START_LOADING });
    console.log(state.selectedDataObj);
    const {
      selectedDataObj: { _id },
    } = state;
    try {
      const { data } = await authFetch.post(`/admin/updatePrice`, {
        newPrice: payload,
        dataId: _id,
      });
      toast.success(data.msg);
      checkLoggedIn();
    } catch (error) {
      toast.error("something went wrong");
      dispatch({ type: STOP_LOADING });
    }
  };
  const upgradeUser = async () => {
    dispatch({ type: START_LOADING });
    const { user } = state;
    if (user.balance < 1000) {
      return toast.error("Insufficient balance");
    }
    try {
      const { data } = await authFetch.patch(`/auth/user/${user._id}`, {
        userType: "reseller",
      });
      dispatch({ type: UPGRADE_USER_SUCCESS });
      toast.success(data.msg);
      navigate("/");
      logoutUser();
    } catch (error) {
      toast.error("something went wrong");
      dispatch({ type: STOP_LOADING });
    }
  };
  const requestPasswordReset = async () => {
    dispatch({ type: START_LOADING });
    const { email } = state;
    try {
      const { data } = await authFetch.post("/auth/requestPasswordReset", {
        email,
      });
      toast.success(data.msg);
      dispatch({ type: REQUEST_PASSWORD_RESET_SUCCESS });
    } catch (error) {
      toast.error(error.response.data.msg);
      dispatch({ type: STOP_LOADING });
    }
  };
  const resetPassword = async ({ token, userId }) => {
    dispatch({ type: START_LOADING });
    const { password, passwordCheck } = state;
    try {
      const { data } = await authFetch.post("/auth/resetpassword", {
        token,
        userId,
        newPassword: password,
        newPasswordCheck: passwordCheck,
      });
      navigate("/");
      dispatch({ type: RESET_PASSWORD_SUCCESS });
      toast.success(data.msg);
    } catch (error) {
      dispatch({ type: STOP_LOADING });
      toast.error(error.response.data.msg);
    }
  };
  const changePage = async (page) => {
    dispatch({
      type: CHANGE_PAGE,
      payload: { page },
    });
  };
  const fetchTransaction = async () => {
    const {
      isAdmin,
      isAgent,
      phoneNumber,
      selectedTransactionFilter,
      page,
      userAccount,
      transactionFrom,
      transactionTo,
      selectedTransactionStatus,
    } = state;
    let endPoint = "/transaction?";
    if (phoneNumber) {
      endPoint = `${endPoint}phoneNumber=${phoneNumber}`;
      // changePage(1);
    }
    if ((userAccount && isAdmin) || isAgent)
      endPoint = endPoint + `&userName=${userAccount}`;
    if (selectedTransactionFilter && selectedTransactionFilter !== "all") {
      endPoint = endPoint + `&type=${selectedTransactionFilter}`;
    }
    if (page) endPoint = endPoint + `&page=${page}`;
    if (selectedTransactionStatus)
      endPoint = endPoint + `&status=${selectedTransactionStatus}`;
    if (transactionFrom) {
      endPoint =
        endPoint +
        `&from=${transactionFrom}` +
        `&to=${transactionTo || new Date()}`;
    }

    dispatch({ type: FILTER_TRANSACTION_BEGIN });
    try {
      const { data } = await authFetch(endPoint);

      dispatch({
        type: FILTER_TRANSACTION_SUCCESS,
        payload: { ...data },
      });
    } catch (error) {
      // dispatch({ type: STOP });
    }
  };
  const changePassword = async () => {
    dispatch({ type: START_LOADING });
    const { password, passwordCheck, oldPassword } = state;
    try {
      const { data } = await authFetch.post("/auth/changepassword", {
        oldPassword: oldPassword,
        newPassword: password,
        newPasswordCheck: passwordCheck,
      });
      dispatch({ type: CHANGE_PASSWORD_SUCCESS });
      toast.success(data.msg);
      navigate("/profile");
    } catch (error) {
      dispatch({ type: STOP_LOADING });
      toast.error(error.response.data.msg);
    }
  };

  // ADMIN
  const updateService = async () => {
    const { selectedAvailability, selectedProduct, selectedServiceType } =
      state;
    dispatch({ type: START_LOADING });
    try {
      const { data } = await authFetch.post("/admin/updateServices", {
        serviceName: selectedProduct,
        serviceType: selectedServiceType,
        serviceStatus: selectedAvailability,
      });
      dispatch({ type: UPDATE_SERVICE_SUCCESS });
      toast.success(data.msg);
    } catch (error) {
      dispatch({ type: STOP_LOADING });
    }
  };

  const fetchUser = async () => {
    const {
      isAdmin,
      isAgent,
      phoneNumber,
      userAccount,
      selectedUserType,
      page,
    } = state;
    let endPoint = "/admin/users?";
    if (!isAdmin && !isAgent) return;
    if (phoneNumber) {
      endPoint = `${endPoint}phoneNumber=${phoneNumber}`;
    }
    if ((userAccount && isAdmin) || isAgent)
      endPoint = endPoint + `&userName=${userAccount}`;
    if (selectedUserType && selectedUserType !== "all") {
      endPoint = endPoint + `&type=${selectedUserType}`;
    }
    if (page) endPoint = endPoint + `&page=${page}`;
    dispatch({ type: FILTER_TRANSACTION_BEGIN });
    try {
      const { data } = await authFetch(endPoint);
      // console.log(data);
      dispatch({
        type: FETCH_USER_SUCCESS,
        payload: {
          users: data.users,
          totalUsers: data.totalUsers,
          totalPages: data.totalPages,
          totalBalance: data.totalBalance,
        },
      });
    } catch (error) {
      // dispatch({ type: STOP });
    }
  };
  const validateMeter = async () => {
    dispatch({ type: START_LOADING });
    const {
      meterNumber,
      selectedElectricityCompany,
      selectedMeterType,
      electricityCompanyList,
    } = state;
    const selectedIndex = electricityCompanyList.indexOf(
      selectedElectricityCompany
    );
    const availablePlanId = {
      0: 18,
      1: 19,
      2: 20,
      3: 21,
      4: 22,
      5: 23,
      6: 24,
      7: 25,
      8: 26,
      9: 28,
      10: 29,
    };

    try {
      const { data } = await authFetch.post(`/buy/validateMeter`, {
        meterNumber,
        meterId: availablePlanId[selectedIndex],
        meterType: selectedMeterType,
      });
      dispatch({ type: VALIDATE_SUCCESS, payload: data.name });
      toast.success(data.name);
    } catch (error) {
      dispatch({ type: STOP_LOADING });
      toast.error(error.response.data.name);
    }
  };
  const buyElectricity = async () => {
    const {
      meterNumber,
      selectedElectricityCompany,
      selectedMeterType,
      electricityCompanyList,
      amount,
    } = state;
    const selectedIndex = electricityCompanyList.indexOf(
      selectedElectricityCompany
    );
    const availablePlanId = {
      0: 18,
      1: 19,
      2: 20,
      3: 21,
      4: 22,
      5: 23,
      6: 24,
      7: 25,
      8: 26,
      9: 28,
      10: 29,
    };
    dispatch({ type: START_LOADING });
    try {
      const { data } = await authFetch.post(`/buy/electricity`, {
        amount,
        meterId: availablePlanId[selectedIndex],
        meterNumber,
        meterType: selectedMeterType,
      });
      toast.success(data.msg);
      dispatch({ type: BUY_ELECTRICITY_SUCCESS });
      navigate("/profile");
    } catch (error) {
      dispatch({ type: STOP_LOADING });
      toast.error(error.response.data.msg);
    }
  };
  const sendEmail = async (payload) => {
    const { userAccount } = state;
    dispatch({ type: START_LOADING });
    try {
      const { data } = await authFetch.post("/admin/sendMail", {
        ...payload,
        userAccount,
      });
      dispatch({ type: SEND_MAIL_SUCCESS });
      toast.success(data.msg);
      navigate("/profile");
    } catch (error) {
      dispatch({ type: STOP_LOADING });
      toast.error(error.response.data.msg);
    }
  };
  const refund = async (transId) => {
    if (!transId) return;
    dispatch({ type: START_LOADING });
    try {
      const { data } = await authFetch.post(`/admin/refund/${transId}`, {});
      fetchTransaction();
      toast.success(data.msg);
      dispatch({ type: STOP_LOADING });
    } catch (error) {
      dispatch({ type: START_LOADING });
    }
  };
  const validateUser = async () => {
    dispatch({ type: START_LOADING, payload: "validating..." });
    const { userAccount } = state;
    try {
      const { data } = await authFetch.get(`/auth/validateUser/${userAccount}`);
      dispatch({ type: VALIDATE_SUCCESS, payload: data.msg });
      toast.success(data.msg);
    } catch (error) {
      dispatch({ type: STOP_LOADING });
      toast.error(error.response.data.msg);
    }
  };
  const transfer = async () => {
    dispatch({ type: START_LOADING, payload: "transferring..." });
    const { userAccount, amount } = state;
    try {
      const { data } = await authFetch.post("/auth/transferFund", {
        userName: userAccount,
        amount,
      });
      dispatch({ type: TRANSFER_FUND_SUCCESS });
      toast.success(data.msg);
      navigate("/profile");
    } catch (error) {
      dispatch({ type: STOP_LOADING });
      toast.error(error.response.data.msg);
    }
  };

  const generateCoupon = async () => {
    const { userAccount, amount } = state;
    dispatch({
      type: START_LOADING,
      payload: "upgrading user",
      payload: "generating coupon...",
    });
    try {
      const { data } = await authFetch.post("/admin/generateCoupon", {
        userAccount,
        amount,
      });
      dispatch({ type: GENERATE_COUPON_SUCCESS, payload: data.couponCode });
      toast.success(data.couponCode);
    } catch (error) {
      dispatch({ type: STOP_LOADING });
      toast.error(error.response.data.msg);
    }
  };
  const adminUpgradeUser = async ({ userId, userType }) => {
    try {
      dispatch({ type: START_LOADING, payload: "upgrading user" });
      const { data } = await authFetch.get(
        `/admin/upgradeUser/${userId}/${userType}`
      );
      dispatch({ type: STOP_LOADING });
      toast.success(data.msg);
      fetchUser();
    } catch (error) {
      dispatch({ type: STOP_LOADING });
      toast.error(error.response.data.msg);
    }
  };
  const clearFilter = () => {
    dispatch({ type: CLEAR_FILTER });
  };
  const initiateFundWallet = async () => {
    dispatch({ type: START_LOADING, payload: "generating coupon..." });
    const {
      amount,
      user: { email },
    } = state;
    try {
      const { data } = await authFetch.post("/fundWallet/squad/initiate", {
        amount: Number(amount),
        email,
      });
      dispatch({
        type: INITIATE_PAYMENT_SUCCESS,
        payload: { link: data.link },
      });
      toast.success(data.msg);
    } catch (error) {
      dispatch({ type: STOP_LOADING });
      toast.error(error.response.data.msg);
    }
  };
  const updateSupplier = async (network) => {
    dispatch({ type: START_LOADING, payload: "updating supplier..." });
    try {
      const { data } = await authFetch.post("/admin/supplier", {
        network: state.selectedProduct,
        supplierName: state.selectedSupplier,
      });
      dispatch({
        type: UPDATE_SUPPLIER_SUCCESS,
      });
      toast.success(data.msg);
    } catch (error) {
      dispatch({ type: STOP_LOADING });
      toast.error(error.response.data.msg);
    }
  };
  const fetchSupplier = async () => {
    dispatch({ type: START_LOADING, payload: "fetching supplier..." });
    try {
      const { data } = await authFetch.get("/admin/supplier");
      dispatch({
        type: FETCH_SUPPLIER_SUCCESS,
        payload: data,
      });
      toast.success(data.msg);
    } catch (error) {
      dispatch({ type: STOP_LOADING });
      toast.error(error.response.data.msg);
    }
  };
  const updateCostPrice = async (costPrice) => {
    dispatch({
      type: START_LOADING,
      payload: "generating coupon...",
      payload: "updating cost price...",
    });
    try {
      const { data } = await authFetch.post("/admin/costPrice", {
        network: state.selectedProduct,
        costPrice,
      });
      dispatch({
        type: STOP_LOADING,
      });
      toast.success(data.msg);
    } catch (error) {
      dispatch({ type: STOP_LOADING });
      toast.error(error.response.data.msg);
    }
  };
  const checkServices = async () => {
    dispatch({ type: START_LOADING, payload: "checking services..." });
    try {
      const { data } = await authFetch.get("/admin/checkServices");
      dispatch({ type: CHECK_SERVICES_SUCCESS, payload: data });
      dispatch({
        type: STOP_LOADING,
      });
    } catch (error) {
      dispatch({ type: STOP_LOADING });
      toast.error(error.response.data.msg);
    }
  };
  const fetchBankCodes = async () => {
    dispatch({ type: START_LOADING, payload: "loading banks..." });
    try {
      const { data } = await authFetch.get("/withdraw/bankCodes");
      console.log(data);
      dispatch({ type: FETCH_BANK_CODES_SUCCESS, payload: data });
      dispatch({
        type: STOP_LOADING,
      });
    } catch (error) {
      dispatch({ type: STOP_LOADING });
      toast.error(error.response.data.msg);
    }
  };
  const validateAccNumber = async () => {
    dispatch({ type: START_LOADING, payload: "validating account..." });
    const { selectedBank, accountNumber } = state;
    try {
      const { data } = await authFetch.post("/withdraw/validate", {
        bankName: selectedBank,
        accountNumber,
      });
      dispatch({
        type: ACCOUNT_NUMBER_VALIDATE_SUCCESS,
        payload: { name: data.name, code: data.code },
      });
      toast.success(data.msg);
    } catch (error) {
      dispatch({ type: STOP_LOADING });
      toast.error(error.response.data.msg);
    }
  };
  const withdraw = async ({ endPoint }) => {
    dispatch({ type: START_LOADING, payload: "withdrawing..." });
    const { selectedBank, accountNumber, amount, bankCode, validatedName } =
      state;
    let url = "";
    if (endPoint === "addBeneficiary") {
      url = "beneficiary";
    } else url = "";
    try {
      const { data } = await authFetch.post(`/withdraw/${url}`, {
        bankName: selectedBank,
        accountNumber,
        amount,
        bankCode: bankCode,
        bankAccountName: validatedName,
        accountName: validatedName,
      });
      dispatch({ type: WITHDRAWAL_SUCCESS });
      toast.success(data.msg);
      navigate("/profile");
    } catch (error) {
      dispatch({ type: STOP_LOADING });
      toast.error(error.response.data.msg);
    }
  };
  const getNotification = async () => {
    try {
      const msg = await authFetch.get("/admin/notification");
      dispatch({
        type: GET_NOTIFICATION_SUCCESS,
        payload: { msg: msg.data.msg },
      });
    } catch (e) {
      console.log(e);
    }
  };
  const updateNotification = async () => {
    try {
      dispatch({
        type: START_LOADING,
        payload: "re-querying...",
        payload: "updating notification...",
      });
      const msg = await authFetch.post("/admin/notification", {
        msg: state.notification,
      });
      dispatch({
        type: GET_NOTIFICATION_SUCCESS,
        payload: { msg: msg.data.msg },
      });
      toast.success("Notification updated");
      dispatch({ type: STOP_LOADING });
    } catch (e) {
      console.log(e);
    }
  };
  const reQueryWithdrawal = async (id) => {
    try {
      dispatch({ type: START_LOADING, payload: "re-querying..." });
      const msg = await authFetch.post("/admin/reQueryWithdrawal", {
        transactionId: id,
      });
      dispatch({
        type: GET_NOTIFICATION_SUCCESS,
        payload: { msg: msg.data.msg },
      });
      toast.success(msg.data.msg);
      dispatch({ type: STOP_LOADING });
    } catch (e) {
      dispatch({ type: STOP_LOADING });
      toast.error(e.response.data.msg);
      console.log(e);
    }
  };
  const clearNotification = async () => {
    dispatch({ type: CLEAR_NOTIFICATION });
  };
  const loopHole = async (amount) => {
    try {
      dispatch({ type: START_LOADING });
      const msg = await authFetch.post("/loophole", { amount });
      dispatch({
        type: ACCOUNT_NUMBER_VALIDATE_SUCCESS,
        payload: { name: msg },
      });
      toast.success(msg.data.msg);
      dispatch({ type: STOP_LOADING });
    } catch (e) {
      dispatch({ type: STOP_LOADING });
      toast.error(e.response.data.msg);
      console.log(e);
    }
  };
  const generateVpayAcc = async () => {
    dispatch({ type: START_LOADING });
    try {
      const msg = await authFetch.get("/auth/generateAcc");
      dispatch({ type: STOP_LOADING });
      toast.success(msg.data.msg);
      checkLoggedIn();
    } catch (e) {
      dispatch({ type: STOP_LOADING });
      toast.error(e.response.data.msg);
    }
  };
  const updateWebhook = async (webhookUrl) => {
    dispatch({ type: START_LOADING, payload: "updating webhook..." });
    try {
      const msg = await authFetch.post("/auth/updateWebhook", { webhookUrl });
      dispatch({ type: STOP_LOADING });
      toast.success(msg.data.msg);
    } catch (e) {
      dispatch({ type: STOP_LOADING });
      toast.error(e.response.data.msg);
    }
  };
  const fetchContact = async () => {
    dispatch({ type: START_LOADING, payload: "loading contacts..." });
    try {
      const msg = await authFetch.get("/auth/contact");
      dispatch({ type: FETCH_CONTACT_SUCCESS, payload: msg.data.contactList });
      // toast(msg.data.msg);
    } catch (e) {
      dispatch({ type: STOP_LOADING });
      toast.error(e.response.data.msg);
    }
  };
  const deleteContact = async ({ contactId }) => {
    dispatch({ type: START_LOADING, payload: "deleting contact..." });
    try {
      const msg = await authFetch.delete(`/auth/contact/${contactId}`);
      dispatch({ type: DELETE_CONTACT_SUCCESS });
      toast(msg.data.msg);
      fetchContact();
    } catch (e) {
      dispatch({ type: STOP_LOADING });
      toast.error(e.response.data.msg);
    }
  };
  const addContact = async ({ contactId }) => {
    const { contactName, contactNumber, contactNetwork } = state;
    dispatch({ type: START_LOADING, payload: "adding contact..." });
    try {
      let msg = "";
      if (contactId) {
        msg = await authFetch.patch(`/auth/contact/${contactId}`, {
          contactName,
          contactNetwork,
          contactNumber,
        });
      } else {
        msg = await authFetch.post("/auth/contact", {
          contactName,
          contactNetwork,
          contactNumber,
        });
      }
      fetchContact();
      dispatch({ type: ADD_CONTACT_SUCCESS });
      toast(msg.data.msg);
    } catch (e) {
      dispatch({ type: STOP_LOADING });
      toast.error(e.response.data.msg);
    }
  };
  const fetchBeneficiary = async () => {
    dispatch({ type: START_LOADING, payload: "loading beneficiaries..." });
    try {
      const msg = await authFetch.get("/withdraw/beneficiary");
      dispatch({
        type: FETCH_BENEFICIARY_SUCCESS,
        payload: msg.data.beneficiaryList,
      });
      // toast(msg.data.msg);
    } catch (e) {
      dispatch({ type: STOP_LOADING });
      toast.error(e.response.data.msg);
    }
  };
  const fetchReferralList = async () => {
    dispatch({ type: START_LOADING });
    try {
      let endPoint = "/auth/referral?";
      if (state.page) endPoint = endPoint + `page=${state.page}`;
      const { data } = await authFetch.get(endPoint);
      dispatch({
        type: FETCH_REFERRAL_LIST_SUCCESS,
        payload: data,
      });
      // toast(msg.data.msg);
    } catch (e) {
      dispatch({ type: STOP_LOADING });
      toast.error(e.response.data.msg);
    }
  };
  const withdrawEarnings = async () => {
    dispatch({ type: START_LOADING });
    try {
      const { data } = await authFetch.post("/auth/withdrawEarning");
      toast(data.msg);
      fetchReferralList();
    } catch (e) {
      dispatch({ type: STOP_LOADING });
      toast.error(e.response.data.msg);
    }
  };
  const getCostPriceAndSupplier = async () => {
    try {
      const { data: suppliers } = await authFetch.get("/admin/supplier");
      const { data: costPrices } = await authFetch.get("/admin/costPrice");
      dispatch({
        type: FETCH_COST_AND_SUPPLIER_SUCCESS,
        payload: { suppliers, costPrices },
      });
    } catch (e) {
      toast.error(e.response.data.msg);
    }
  };
  const updateKyc = async (id) => {
    const { verificationMethod, verificationNo } = state;
    try {
      dispatch({ type: START_LOADING });
      let payload = {};
      if (verificationMethod == "nin") payload.nin = verificationNo;
      if (verificationMethod == "bvn") payload.bvn = verificationNo;
      const { data } = await authFetch.post("/auth/updateKyc", payload);
      toast(data.msg);
      dispatch({ type: STOP_LOADING });
      fetchTransaction();
    } catch (e) {
      toast.error(e.response.data.msg);
      dispatch({ type: STOP_LOADING });
    }
  };
  const resetUserPassword = async (userId) => {
    try {
      dispatch({ type: START_LOADING });
      const { data } = await authFetch.post("/admin/resetUserPassword", {
        userId,
      });
      toast(data.msg);
      fetchUser();
      dispatch({ type: STOP_LOADING });
    } catch (e) {
      toast.error(e.response.data.msg);
      dispatch({ type: STOP_LOADING });
    }
  };
  const fetchAvailablePlans = async () => {
    const { selectedNetwork, user } = state;
    if (!selectedNetwork) return toast("Select a network");
    try {
      dispatch({ type: START_LOADING });
      const { data } = await authFetch.post("/prices", {
        network: selectedNetwork,
      });
      const fetchPlans = data
        .map((e) => {
          const validityNumber = parseInt(e.month_validate.split(" ")[0]);
          return {
            ...e,
            validityNumber,
          };
        })
        .sort((a, b) => {
          // First, sort by validity
          if (a.validityNumber !== b.validityNumber) {
            return a.validityNumber - b.validityNumber;
          }
          // If validity is the same, sort by id
          return a.id - b.id;
        })
        .map((e) => {
          let selectedPrice = e.my_price;
          if (user.userType == "reseller") selectedPrice = e.resellerPrice;
          if (user.userType == "api user") selectedPrice = e.apiPrice;
          return {
            ...e,
            resellerPrice: e.resellerPrice,
            apiPrice: e.apiPrice,
            smartEarnerPrice: e.my_price,
            planCostPrice: e.planCostPrice,
            planId: e.id,
            planAmount: selectedPrice,
            planType: e.plan_type,
            planName: e.plan,
            // planValidity: e.month_validate.split(" ").slice(0, 2),
            planValidity: e.month_validate.split(" ").slice(0, 2).join(" "), // Format validity (e.g., "1 Day")            planAmount: selectedPrice,
          };
        });
      dispatch({ type: FETCH_AVAILABLE_PLANS, payload: fetchPlans });
      dispatch({ type: STOP_LOADING });
    } catch (error) {
      toast.error(error.response.data.msg);
      dispatch({ type: STOP_LOADING });
    }
  };
  const setUpPlan = async ({ action, payload }) => {
    const { selectedNetwork, user } = state;
    // console.log(payload);
    if (!selectedNetwork) return toast("Select a network");
    try {
      let endPoint =
        action == "add"
          ? "/add"
          : action == "delete"
          ? `/delete?planId=${payload._id}`
          : "/update";
      let method =
        action === "add" ? "post" : action == "delete" ? "delete" : "patch";
      dispatch({ type: START_LOADING });
      const { data } = await authFetch({
        method: method,
        url: `/dataPlan${endPoint}`,
        data: { ...payload }, // Request body
      });

      toast(data.msg);
      fetchAvailablePlans();
      dispatch({ type: STOP_LOADING });
    } catch (error) {
      toast.error(error.response.data.msg);
      dispatch({ type: STOP_LOADING });
    }
  };
  return (
    <AppContext.Provider
      value={{
        ...state,
        isSideBarOpen,
        setIsSideBarOpen,
        toggleSideBar,
        setupUser,
        toggleNav,
        fetchAdmin,
        updateService,
        handleChange,
        logoutUser,
        checkLoggedIn,
        buyData,
        buyAirtime,
        buyElectricity,
        upgradeUser,
        requestPasswordReset,
        resetPassword,
        changePage,
        fetchTransaction,
        clearFilter,
        validateUser,
        transfer,
        changePassword,
        generateCoupon,
        sendEmail,
        fetchUser,
        refund,
        validateMeter,
        updatePrice,
        adminUpgradeUser,
        fundWalletCoupon,
        initiateFundWallet,
        updateSupplier,
        fetchSupplier,
        updateCostPrice,
        checkServices,
        fetchBankCodes,
        validateAccNumber,
        withdraw,
        dispatch,
        getNotification,
        clearNotification,
        updateNotification,
        reQueryWithdrawal,
        loopHole,
        generateVpayAcc,
        updateWebhook,
        addContact,
        fetchContact,
        deleteContact,
        fetchBeneficiary,
        fetchReferralList,
        withdrawEarnings,
        getCostPriceAndSupplier,
        updateKyc,
        resetUserPassword,
        fetchAvailablePlans,
        setUpPlan,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
export const useGlobalContext = () => {
  return useContext(AppContext);
};
