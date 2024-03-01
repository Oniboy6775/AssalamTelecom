import React, { useEffect, useState } from "react";
import Faq from "react-faq-component";
import { Modal } from "../components/Modal";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../context/UserContext";
import FormInput from "../components/FormInput";
import FormRowSelect from "../components/FormRowSelect";
import { toast } from "react-toastify";
const Partnership = () => {
  const {
    user,
    handleChange,
    upgradeToPartner,
    isLoading,
    bankCodesList,
    fetchBankCodes,
    accountNumber,
    validatedName,

    bankName,
  } = useGlobalContext();
  const [showModal, setShowModal] = useState(false);
  const data = {
    rows: [
      {
        title: "How much does it cost to become a partner?",
        content:
          "The partnership fee is only N1,000, a one-time payment to join our community. We believe in affordability and accessibility for everyone.",
      },
      {
        title: "How do I renew my partnership?",
        content:
          "To maintain your active status, you'll pay a 15% fee on your withdrawals. This covers essential resources and support for your continued growth.",
      },
      {
        title: "How can I earn money as a partner?",
        content:
          "You'll earn commissions on every transaction made by your referrals. NOTE: If a downline transaction is refunded, your earned commission from that transaction will be automatically reversed from your account to ensure fairness and maintain financial stability. For detailed commission rates and payout structures, please check our pricing page for more info.",
      },
      {
        title: "How much do I personally earn?",
        content:
          "Your earning potential is unlimited and depends on your dedication and network growth. The more transactions your downline members make, the higher your commissions and overall income can be. We encourage you to check our pricing page at  for an overview of potential earnings based on different levels of activity.",
      },
      {
        title: "When can I withdraw my earnings?",
        content:
          "You can withdraw your earnings anytime between the 25th to the end of each month. The minimum withdrawal amount is N1,000.",
      },
      {
        title: "What other benefits do I get as a partner?",
        content:
          "You'll have access to exclusive resources, training, support, and tools to maximize your success. We're committed to your growth every step of the way.",
      },
      {
        title: "How do I become a partner?",
        content:
          "Click the 'Become a Partner' button below and provide your withdrawal details. We'll guide you through the simple registration process and unlock your path to financial growth! Remember, becoming a partner only costs N1,000 - an affordable first step towards financial freedom.",
      },
    ],
  };
  const navigate = useNavigate();
  const handleInputChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    handleChange({ name, value });
  };
  function toggleModal() {
    setShowModal(!showModal);
  }
  function checkPricing() {
    navigate("/priceList");
  }
  function checkEarnings() {
    navigate("/profile/transactions");
    handleChange({ name: "selectedTransactionFilter", value: "earning" });
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!accountNumber || !validatedName || !bankName) {
      toast.warning("All fields are required");
      return;
    }
    upgradeToPartner();
  };
  useEffect(() => {
    if (bankCodesList.length < 1) fetchBankCodes();
  }, []);
  return (
    <div className=" md:ml-[6rem] bg-white p-4">
      {showModal && (
        <Modal
          title="Are you sure"
          children={
            <>
              <p className="text-yellow-800">
                You will be charged ₦1000 now and 15% on your earnings for your
                monthly partnership renewal
              </p>
              <p className="text-center">Enter your bank details</p>

              <FormInput
                placeholder="Bank"
                type="text"
                name="bankName"
                value={bankName}
                labelText="Bank Name"
                handleChange={handleInputChange}
                className="text-left"
              />
              <FormInput
                placeholder="account name"
                type="text"
                name="validatedName"
                value={validatedName}
                labelText="account name"
                handleChange={handleInputChange}
                className="text-left"
              />
              <FormInput
                placeholder="Account number"
                type="number"
                name="accountNumber"
                value={accountNumber}
                labelText="account number"
                handleChange={handleInputChange}
                className="text-left"
              />
            </>
          }
          buttons={[
            {
              name: "cancel",
              className: "btn-danger",
              handleClick: toggleModal,
            },
            {
              name: "pay",
              handleClick: handleSubmit,
            },
          ]}
        />
      )}
      <h2 className="title underline">Become a partner</h2>
      <h5 className="font-bold">Frequently asked question(FAQ)</h5>
      <Faq data={data} />
      <div className="text-center my-3 space-x-3">
        {!user.isPartner && (
          <div className="btn" onClick={toggleModal}>
            Become a partner
          </div>
        )}
        <div className="btn btn-hipster" onClick={checkPricing}>
          Pricing
        </div>
        <div className="btn btn-danger" onClick={checkEarnings}>
          check my earning
        </div>
      </div>
    </div>
  );
};

export default Partnership;
