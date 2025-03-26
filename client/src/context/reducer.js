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

const reducer = (state, action) => {
  if (action.type === START_LOADING) {
    return {
      ...state,
      isLoading: true,
      loadingText: action.payload || "Loading...",
    };
  }

  if (action.type === STOP_LOADING) {
    return { ...state, isLoading: false, loadingText: "", loadingText: "" };
  }
  if (action.type === LOGOUT_USER) {
    return {
      ...state,
      ...action.payload,
      token: "",
      user: null,
    };
  }
  if (action.type === HANDLE_CHANGE) {
    return {
      ...state,
      [action.payload.name]: action.payload.value,
    };
  }

  if (action.type === FETCH_ADMIN_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      loadingText: "",
      showAlert: true,
      alertType: "success",
      alertText: "Admin Fetch Success",
      adminDetails: { ...action.payload.adminDetails },
    };
  }
  if (action.type === FETCH_USER_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      loadingText: "",
      adminDetails: { ...state.adminDetails, allUsers: action.payload.users },
      numOfPages: action.payload.totalPages,
      totalUsers: action.payload.totalUsers,
      totalBalance: action.payload.totalBalance,
      filteringTransactions: false,
    };
  }

  if (action.type === UPDATE_SERVICE_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      loadingText: "",
      selectedServiceType: "airtime",
      selectedAvailability: "enable",
      selectedProduct: "MTN",
    };
  }

  if (action.type === SETUP_USER_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      loadingText: "",
      showAlert: true,
      selectedNetwork: "MTN",
      ...action.payload,
    };
  }

  if (action.type === HANDLE_DATA_OPTION_CHANGE) {
    return {
      ...state,
      filteredDataOptions: action.payload,
      selectedPlan: action.payload[0],
    };
  }

  if (action.type === BUY_DATA_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      loadingText: "",
      phoneNumber: "",
      selectedNetwork: "MTN",
      contactName: "",
      contactNetwork: "MTN",
      contactNumber: "",
      transactions: [action.payload.receipt, ...state.transactions],
      user: { ...state.user, balance: action.payload.receipt.balance_After },
      // isSuccessful: true,
    };
  }

  if (action.type === BUY_AIRTIME_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      loadingText: "",
      phoneNumber: "",
      selectedNetwork: "MTN",
      amount: "",
      contactName: "",
      contactNetwork: "MTN",
      contactNumber: "",
      transactions: [action.payload.receipt, ...state.transactions],
      user: { ...state.user, balance: action.payload.receipt.balance_After },
      // isSuccessful: true,
    };
  }

  if (action.type === UPGRADE_USER_SUCCESS) {
    return { ...state, isLoading: false };
  }

  if (action.type === REQUEST_PASSWORD_RESET_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      loadingText: "",
    };
  }
  if (action.type === RESET_PASSWORD_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      loadingText: "",
    };
  }

  if (action.type === FILTER_TRANSACTION_BEGIN) {
    return {
      ...state,
      filteringTransactions: true,
    };
  }
  if (action.type === FILTER_TRANSACTION_SUCCESS) {
    return {
      ...state,
      filteringTransactions: false,
      numOfPages: action.payload.totalPages,
      totalTransactions: action.payload.noOfTransaction,
      transactions: action.payload.transactions,
      totalSales: action.payload.totalSales,
      totalProfit: action.payload.totalProfit,
      stat: action.payload.stat,
      totalDebit: action.payload.totalDebit,
      totalCredit: action.payload.totalCredit,
    };
  }
  if (action.type === CHANGE_PAGE) {
    return {
      ...state,
      page: action.payload.page,
    };
  }
  if (action.type === CLEAR_FILTER) {
    return {
      ...state,
      phoneNumber: "",
      selectedTransactionFilter: "",
      pageNumber: "",
      page: "1",
      userAccount: "",
      transactionFrom: "",
      transactionTo: "",
      selectedTransactionStatus: "",
    };
  }
  if (action.type === VALIDATE_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      loadingText: "",
      isValidated: true,
      validatedName: action.payload,
    };
  }
  if (action.type === ACCOUNT_NUMBER_VALIDATE_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      loadingText: "",
      isValidated: true,
      validatedName: action.payload.name,
      bankCode: action.payload.code,
    };
  }
  if (action.type === WITHDRAWAL_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      loadingText: "",
      isValidated: false,
      validatedName: "",
      accountNumber: "",
      amount: "",
      bankCode: "",
    };
  }
  if (action.type === TRANSFER_FUND_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      loadingText: "",
      isValidated: false,
      validatedName: "",
      userAccount: "",
      amount: 0,
    };
  }
  if (action.type === BUY_ELECTRICITY_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      loadingText: "",
      isValidated: false,
      validatedName: "",
      amount: 0,
      meterNumber: "",
    };
  }
  if (action.type === CHANGE_PASSWORD_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      loadingText: "",
      oldPassword: "",
      password: "",
      passwordCheck: "",
    };
  }
  if (action.type === GENERATE_COUPON_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      loadingText: "",
      userAccount: "",
      amount: "",
      couponCode: action.payload,
      isValidated: false,
    };
  }
  if (action.type === SEND_MAIL_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      loadingText: "",
      userAccount: "",
      isValidated: false,
    };
  }
  if (action.type === FUND_WALLET_COUPON) {
    return {
      ...state,
      isLoading: false,
      loadingText: "",
      user: {
        ...state.user,
        balance: state.user.balance + action.payload.amount,
      },
    };
  }
  if (action.type === INITIATE_PAYMENT_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      loadingText: "",
      isValidated: true,
      paymentLink: action.payload.link,
    };
  }
  if (action.type === UPDATE_SUPPLIER_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      loadingText: "",
      selectedNetwork: "MTN",
      selectedSupplier: "ALARO",
    };
  }
  if (action.type === CHECK_SERVICES_SUCCESS) {
    return {
      ...state,
      availableServices: action.payload,
    };
  }
  if (action.type === FETCH_SUPPLIER_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      loadingText: "",
      fetchedSupplierList: action.payload,
    };
  }
  if (action.type === FETCH_BANK_CODES_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      loadingText: "",
      bankCodesList: action.payload,
    };
  }
  if (action.type === ADD_CONTACT_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      loadingText: "",
      contactName: "",
      contactNumber: "",
      contactNetwork: "MTN",
      selectedNetwork: "MTN",
    };
  }
  if (action.type === FETCH_CONTACT_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      loadingText: "",
      contactList: action.payload,
      contactName: "",
      contactNumber: "",
      contactNetwork: "MTN",
      selectedNetwork: "MTN",
    };
  }
  if (action.type === DELETE_CONTACT_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      loadingText: "",
      contactName: "",
      contactNumber: "",
      contactNetwork: "MTN",
      selectedNetwork: "MTN",
    };
  }
  if (action.type === FETCH_BENEFICIARY_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      loadingText: "",
      beneficiaryList: action.payload,
    };
  }
  if (action.type === GET_NOTIFICATION_SUCCESS) {
    return { ...state, notification: action.payload.msg };
  }
  if (action.type === CLEAR_NOTIFICATION) {
    return { ...state, isNotificationCheck: true };
  }
  if (action.type === SELECTED_DATA_CHANGE) {
    return {
      ...state,
      selectedDataObj: action.payload,
    };
  }
  if (action.type === "TOGGLE_NAV")
    return {
      ...state,
      isNavOpen: !state.isNavOpen,
    };
  if (action.type === FETCH_REFERRAL_LIST_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      ...action.payload,
    };
  }
  if (action.type === CHANGE_DATA_TYPE_OPTION) {
    return {
      ...state,
      dataTypeOptions: action.payload,
    };
  }
  if (action.type === FETCH_COST_AND_SUPPLIER_SUCCESS) {
    return {
      ...state,
      ...action.payload,
    };
  }
  if (action.type === FETCH_AVAILABLE_PLANS) {
    return {
      ...state,
      isLoading: false,
      availablePlans: action.payload,
    };
  }
  return state;
};
export default reducer;
