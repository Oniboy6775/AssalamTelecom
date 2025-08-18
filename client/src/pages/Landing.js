import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// import styled from "styled-components";
import { IoIosArrowDropdown, IoIosArrowDropup } from "react-icons/io";

import { FaClipboardList, FaUserAlt, FaTimes } from "react-icons/fa";
// import SmallNav from "../components/SmallNav";
import LandingNav from "../components/LandingNav";
import { useGlobalContext } from "../context/UserContext";
import airtimeSvg from "../images/airtime.svg";
import dataSvg from "../images/data.svg";
import electricitySvg from "../images/electricity.svg";
const Landing = () => {
  const { user, token } = useGlobalContext();
  const navigate = useNavigate();

  const services = [
    {
      name: "airtime",
      icon: airtimeSvg,
      desc: "With Our Fast And Easy Service, Your Airtime Will Be Brand New!!!",
    },
    {
      name: "data",
      icon: dataSvg,
      desc: "Want To Help Your Friends And Family Connected? With Our Data Bundle Service, You Can Do Just That!!!",
    },
    {
      name: "electricity token",
      icon: electricitySvg,
      desc: "With Our Easy-To-Use Service, You Can Top-Up Your Electricity Account Without The Hassle Of Going To A Store Or Waiting Inline",
    },
  ];
  const faqData = [
    {
      title: "What is a VTU website?",
      desc: "A VTU website allows you to sell prepaid virtual top-up (VTU) services such as airtime, data bundles, and bill payments for various networks and services.",
      isActive: true,
    },
    {
      title: "Benefits of using your website?",
      desc: "Convenient, easy-to-use, competitive prices, wide product range, secure transactions, fast & efficient service.",
      isActive: false,
    },
    {
      title: "Do I need to register?",
      desc: "No, browsing is free, but registration & account creation are required for purchases.",
      isActive: false,
    },
    {
      title: "Is registration free?",
      desc: "Yes, registration is completely free.",
      isActive: false,
    },
    {
      title: "What payment methods do you accept?",
      desc: "We accept debit/credit cards, bank transfers, and mobile money for your convenience.",
      isActive: false,
    },
    {
      title: "How do I create an account?",
      desc: "Click the 'Register' button and follow the simple steps to create your account.",
      isActive: false,
    },
    {
      title: "How to top up my account balance?",
      desc: "Top up your account balance using any of our supported payment methods.",
      isActive: false,
    },
    {
      title: "How to purchase data, airtime, or other VTU services?",
      desc: "Browse and select the desired product/service, enter recipient details, choose payment method, and click 'Purchase'.",
      isActive: false,
    },
    {
      title: "Transaction processing time?",
      desc: "Most transactions are processed within seconds, slight delays depending on payment method and network.",
      isActive: false,
    },
    {
      title: "What happens if my transaction fails?",
      desc: "Contact our customer support for assistance. We will investigate and resolve the issue promptly. **We will also refund any failed transactions automatically.**",
      isActive: false,
    },
    {
      title: "Do you offer discounts or promotions?",
      desc: "Yes, we regularly offer discounts and promotions. Check our website or social media pages for current offers.",
      isActive: false,
    },
    {
      title: "Can I become a reseller?",
      desc: "Yes, we offer a reseller program where you can earn commissions by selling our products and services.",
      isActive: false,
    },
    {
      title: "Do you have an API?",
      desc: "Yes, we offer an API to integrate our VTU services into your website or application.",
      isActive: false,
    },
    {
      title: "What data plans do you offer?",
      desc: "We offer a wide range of data plans for various networks and devices.",
      isActive: false,
    },
    {
      title: "How to activate my data plan?",
      desc: "Once purchased, your data plan will be automatically activated on the recipient's phone number.",
      isActive: false,
    },
    {
      title: "What airtime denominations are available?",
      desc: "We offer airtime denominations for all major networks.",
      isActive: false,
    },
    {
      title: "How to top up someone's airtime?",
      desc: "Enter recipient's phone number, choose desired airtime denomination, and select your preferred payment method.",
      isActive: false,
    },
    {
      title: "What VTU services do you offer?",
      desc: "We offer a wide range of VTU services, including bill payments for electricity, cable TV, internet, and more.",
      isActive: false,
    },
    {
      title: "How to pay my bills using your website?",
      desc: "Select desired bill payment service, enter your account details, choose payment amount, and select your preferred payment method.",
      isActive: false,
    },
  ];
  const links = [
    { name: "home", link: "/" },
    { name: "login", link: "/login" },
    { name: "register", link: "/register" },
    { name: "pricing", link: "/priceList" },
  ];
  const [faqs, setFaqs] = useState(faqData);
  const handleFaqClick = (currentOpenIndex) => {
    let newFaq = [];
    const index = faqData.findIndex((item) => item.isActive === true);
    if (index !== -1) {
      faqData[index].isActive = false;
      faqData[currentOpenIndex].isActive = true;
    }
    newFaq = faqData;
    setFaqs(newFaq);
  };
  return (
    <div className="relative">
      <LandingNav />
      <section>
        <div className="skewed"></div>
      </section>
      <section className="mt-[80px] min-h-[60vh] m-auto md:min-h-[75vh]  max-w-[var(--max-width)]  flex flex-col md:flex-row md:items-stretch gap-4 w-10/12 h-full">
        <div className="md:w-6/12 ">
          <h1 className="font-extrabold text-transparent text-center md:text-6xl bg-clip-text bg-gradient-to-r from-[var(--primary-500)] to-[var(--secondary-500)]">
            {" "}
            {token ? `Hi ${user.userName}, ` : ""}Welcome to AssalamTelecom
          </h1>
          <p className="text-center text-2xl md:text-3xl">
            A technology platform that offers solutions to digital needs at best
            possible price without compromising quality.
          </p>
          <div className=" flex justify-center gap-4">
            <button
              className=" btn"
              onClick={() => navigate(`${token ? "/profile" : "/login"}`)}
            >
              <FaUserAlt className="mr-2" />
              {token ? "Dashboard" : "Login/Register"}
            </button>
            <button
              className=" btn  btn-hipster"
              onClick={() => navigate("/priceList")}
            >
              <FaClipboardList className="mr-2" />
              Price list
            </button>
          </div>
        </div>
        <div className="">
          <img src="./assets/phone.svg" alt="" />
        </div>
      </section>
      <section className="text-center flex flex-col justify-center items-center">
        <h2 className="title text-center underline"> services</h2>
        <div className="md:flex max-w-[var(--max-width)] md:gap-5  md:justify-center w-[80%]  m-auto md:m-0 ">
          {services.map((e) => {
            return (
              <div
                key={e.name}
                className=" border-t-2 border-t-purple-800 text-center mt-8 p-4 rounded-md shadow-md border "
              >
                <div className="max-w-[100px] m-auto">
                  <img src={e.icon} alt="" className="img" />
                </div>
                <p className="font-bold capitalize">{e.name}</p>
                <p>{e.desc}</p>
              </div>
            );
          })}
        </div>
      </section>
      <section className="mt-10 max-w-[var(--max-width)] w-11/12 m-auto">
        <h2 className="title text-center underline capitalize">
          Frequently asked questions
        </h2>
        <div className="flex flex-col gap-4 ">
          {faqs.map((e, index) => {
            return (
              <div
                onClick={() => handleFaqClick(index)}
                key={e.desc}
                className=" border-2 rounded relative  p-3 "
              >
                {e.isActive ? (
                  <IoIosArrowDropup className=" text-4xl absolute top-2 right-4" />
                ) : (
                  <IoIosArrowDropdown className="text-4xl absolute top-2 right-4" />
                )}
                <h4 className="font-bold text-[var(--secondary-500)]">
                  {e.title}
                </h4>
                {e.isActive && (
                  <p className="text-center font-bold">{e.desc}</p>
                )}
              </div>
            );
          })}
        </div>
      </section>
      <section className="mt-10 bg-black pb-2   text-white border items-center">
        <div className="py-2  max-w-[1300px] m-auto w-11/12">
          <div className=" flex justify-between gap-8 md:gap-0 items-center capitalize mb-4">
            <div className="rounded-full hidden w-48 md:block">
              <img src="./assets/logo.png" alt="" className="img" />
            </div>
            <div className="">
              <ul className="underline">
                {links.map((e, index) => {
                  return (
                    <li
                      key={index}
                      onClick={() => navigate(e.link)}
                      className="p-2 text-lg cursor-pointer"
                    >
                      {e.name}
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="">
              <div className=" ">
                <p className="uppercase text-blue-500">Office address</p>
                <p>Bakiyawa Batagarawa, Kastina State</p>
              </div>
              <div className=" ">
                <p className="uppercase text-blue-500">phone number</p>
                <p>08143529716</p>
              </div>
              <div className=" lowercase">
                <p className="uppercase text-blue-500">Contact us</p>
                <p>admin@AssalamTelecom.com.ng</p>
                
              </div>
            </div>
             <div className="w-11/12 m-auto mt-4">
      <h1 className="title underline">Privacy Policy</h1>
      <p>Last updated: March 28, 2024</p>
      <p>
        This Privacy Policy describes Our policies and procedures on the
        collection, use and disclosure of Your information when You use the
        Service and tells You about Your privacy rights and how the law protects
        You.
      </p>
      <p>
        We use Your Personal data to provide and improve the Service. By using
        the Service, You agree to the collection and use of information in
        accordance with this Privacy Policy.
      </p>
      <h2>Interpretation and Definitions</h2>
      <h3>Interpretation</h3>
      <p>
        The words of which the initial letter is capitalized have meanings
        defined under the following conditions. The following definitions shall
        have the same meaning regardless of whether they appear in singular or
        in plural.
      </p>
      <h3>Definitions</h3>
      <p>For the purposes of this Privacy Policy:</p>
      <ul>
        <li>
          <p>
            <strong>Account</strong> means a unique account created for You to
            access our Service or parts of our Service.
          </p>
        </li>
        <li>
          <p>
            <strong>Affiliate</strong> means an entity that controls, is
            controlled by or is under common control with a party, where
            &quot;control&quot; means ownership of 50% or more of the shares,
            equity interest or other securities entitled to vote for election of
            directors or other managing authority.
          </p>
        </li>
        <li>
          <p>
            <strong>Application</strong> refers to SPP Data Depot, the software
            program provided by the Company.
          </p>
        </li>
        <li>
          <p>
            <strong>Company</strong> (referred to as either &quot;the
            Company&quot;, &quot;We&quot;, &quot;Us&quot; or &quot;Our&quot; in
            this Agreement) refers to SPP Data Depot.
          </p>
        </li>
        <li>
          <p>
            <strong>Country</strong> refers to: Nigeria
          </p>
        </li>
        <li>
          <p>
            <strong>Device</strong> means any device that can access the Service
            such as a computer, a cellphone or a digital tablet.
          </p>
        </li>
        <li>
          <p>
            <strong>Personal Data</strong> is any information that relates to an
            identified or identifiable individual.
          </p>
        </li>
        <li>
          <p>
            <strong>Service</strong> refers to the Application.
          </p>
        </li>
        <li>
          <p>
            <strong>Service Provider</strong> means any natural or legal person
            who processes the data on behalf of the Company. It refers to
            third-party companies or individuals employed by the Company to
            facilitate the Service, to provide the Service on behalf of the
            Company, to perform services related to the Service or to assist the
            Company in analyzing how the Service is used.
          </p>
        </li>
        <li>
          <p>
            <strong>Usage Data</strong> refers to data collected automatically,
            either generated by the use of the Service or from the Service
            infrastructure itself (for example, the duration of a page visit).
          </p>
        </li>
        <li>
          <p>
            <strong>You</strong> means the individual accessing or using the
            Service, or the company, or other legal entity on behalf of which
            such individual is accessing or using the Service, as applicable.
          </p>
        </li>
      </ul>
      <h2>Collecting and Using Your Personal Data</h2>
      <h3>Types of Data Collected</h3>
      <h4>Personal Data</h4>
      <p>
        While using Our Service, We may ask You to provide Us with certain
        personally identifiable information that can be used to contact or
        identify You. Personally identifiable information may include, but is
        not limited to:
      </p>
      <ul>
        <li>
          <p>Email address</p>
        </li>
        <li>
          <p>First name and last name</p>
        </li>
        <li>
          <p>Phone number</p>
        </li>
        <li>
          <p>Address, State, Province, ZIP/Postal code, City</p>
        </li>
        <li>
          <p>Usage Data</p>
        </li>
      </ul>
      <h4>Usage Data</h4>
      <p>Usage Data is collected automatically when using the Service.</p>
      <p>
        Usage Data may include information such as Your Device's Internet
        Protocol address (e.g. IP address), browser type, browser version, the
        pages of our Service that You visit, the time and date of Your visit,
        the time spent on those pages, unique device identifiers and other
        diagnostic data.
      </p>
      <p>
        When You access the Service by or through a mobile device, We may
        collect certain information automatically, including, but not limited
        to, the type of mobile device You use, Your mobile device unique ID, the
        IP address of Your mobile device, Your mobile operating system, the type
        of mobile Internet browser You use, unique device identifiers and other
        diagnostic data.
      </p>
      <p>
        We may also collect information that Your browser sends whenever You
        visit our Service or when You access the Service by or through a mobile
        device.
      </p>
      <h3>Use of Your Personal Data</h3>
      <p>The Company may use Personal Data for the following purposes:</p>
      <ul>
        <li>
          <p>
            <strong>To provide and maintain our Service</strong>, including to
            monitor the usage of our Service.
          </p>
        </li>
        <li>
          <p>
            <strong>To manage Your Account:</strong> to manage Your registration
            as a user of the Service. The Personal Data You provide can give You
            access to different functionalities of the Service that are
            available to You as a registered user.
          </p>
        </li>
        <li>
          <p>
            <strong>For the performance of a contract:</strong> the development,
            compliance and undertaking of the purchase contract for the
            products, items or services You have purchased or of any other
            contract with Us through the Service.
          </p>
        </li>
        <li>
          <p>
            <strong>To contact You:</strong> To contact You by email, telephone
            calls, SMS, or other equivalent forms of electronic communication,
            such as a mobile application's push notifications regarding updates
            or informative communications related to the functionalities,
            products or contracted services, including the security updates,
            when necessary or reasonable for their implementation.
          </p>
        </li>
        <li>
          <p>
            <strong>To provide You</strong> with news, special offers and
            general information about other goods, services and events which we
            offer that are similar to those that you have already purchased or
            enquired about unless You have opted not to receive such
            information.
          </p>
        </li>
        <li>
          <p>
            <strong>To manage Your requests:</strong> To attend and manage Your
            requests to Us.
          </p>
        </li>
        <li>
          <p>
            <strong>For business transfers:</strong> We may use Your information
            to evaluate or conduct a merger, divestiture, restructuring,
            reorganization, dissolution, or other sale or transfer of some or
            all of Our assets, whether as a going concern or as part of
            bankruptcy, liquidation, or similar proceeding, in which Personal
            Data held by Us about our Service users is among the assets
            transferred.
          </p>
        </li>
        <li>
          <p>
            <strong>For other purposes</strong>: We may use Your information for
            other purposes, such as data analysis, identifying usage trends,
            determining the effectiveness of our promotional campaigns and to
            evaluate and improve our Service, products, services, marketing and
            your experience.
          </p>
        </li>
      </ul>
      <p>We may share Your personal information in the following situations:</p>
      <ul>
        <li>
          <strong>With Service Providers:</strong> We may share Your personal
          information with Service Providers to monitor and analyze the use of
          our Service, to contact You.
        </li>
        <li>
          <strong>For business transfers:</strong> We may share or transfer Your
          personal information in connection with, or during negotiations of,
          any merger, sale of Company assets, financing, or acquisition of all
          or a portion of Our business to another company.
        </li>
        <li>
          <strong>With Affiliates:</strong> We may share Your information with
          Our affiliates, in which case we will require those affiliates to
          honor this Privacy Policy. Affiliates include Our parent company and
          any other subsidiaries, joint venture partners or other companies that
          We control or that are under common control with Us.
        </li>
        <li>
          <strong>With business partners:</strong> We may share Your information
          with Our business partners to offer You certain products, services or
          promotions.
        </li>
        <li>
          <strong>With other users:</strong> when You share personal information
          or otherwise interact in the public areas with other users, such
          information may be viewed by all users and may be publicly distributed
          outside.
        </li>
        <li>
          <strong>With Your consent</strong>: We may disclose Your personal
          information for any other purpose with Your consent.
        </li>
      </ul>
      <h3>Retention of Your Personal Data</h3>
      <p>
        The Company will retain Your Personal Data only for as long as is
        necessary for the purposes set out in this Privacy Policy. We will
        retain and use Your Personal Data to the extent necessary to comply with
        our legal obligations (for example, if we are required to retain your
        data to comply with applicable laws), resolve disputes, and enforce our
        legal agreements and policies.
      </p>
      <p>
        The Company will also retain Usage Data for internal analysis purposes.
        Usage Data is generally retained for a shorter period of time, except
        when this data is used to strengthen the security or to improve the
        functionality of Our Service, or We are legally obligated to retain this
        data for longer time periods.
      </p>
      <h3>Transfer of Your Personal Data</h3>
      <p>
        Your information, including Personal Data, is processed at the Company's
        operating offices and in any other places where the parties involved in
        the processing are located. It means that this information may be
        transferred to — and maintained on — computers located outside of Your
        state, province, country or other governmental jurisdiction where the
        data protection laws may differ than those from Your jurisdiction.
      </p>
      <p>
        Your consent to this Privacy Policy followed by Your submission of such
        information represents Your agreement to that transfer.
      </p>
      <p>
        The Company will take all steps reasonably necessary to ensure that Your
        data is treated securely and in accordance with this Privacy Policy and
        no transfer of Your Personal Data will take place to an organization or
        a country unless there are adequate controls in place including the
        security of Your data and other personal information.
      </p>
      <h3>Delete Your Personal Data</h3>
      <p>
        You have the right to delete or request that We assist in deleting the
        Personal Data that We have collected about You.
      </p>
      <p>
        Our Service may give You the ability to delete certain information about
        You from within the Service.
      </p>
      <p>
        You may update, amend, or delete Your information at any time by signing
        in to Your Account, if you have one, and visiting the account settings
        section that allows you to manage Your personal information. You may
        also contact Us to request access to, correct, or delete any personal
        information that You have provided to Us.
      </p>
      <p>
        Please note, however, that We may need to retain certain information
        when we have a legal obligation or lawful basis to do so.
      </p>
      <h3>Disclosure of Your Personal Data</h3>
      <h4>Business Transactions</h4>
      <p>
        If the Company is involved in a merger, acquisition or asset sale, Your
        Personal Data may be transferred. We will provide notice before Your
        Personal Data is transferred and becomes subject to a different Privacy
        Policy.
      </p>
      <h4>Law enforcement</h4>
      <p>
        Under certain circumstances, the Company may be required to disclose
        Your Personal Data if required to do so by law or in response to valid
        requests by public authorities (e.g. a court or a government agency).
      </p>
      <h4>Other legal requirements</h4>
      <p>
        The Company may disclose Your Personal Data in the good faith belief
        that such action is necessary to:
      </p>
      <ul>
        <li>Comply with a legal obligation</li>
        <li>Protect and defend the rights or property of the Company</li>
        <li>
          Prevent or investigate possible wrongdoing in connection with the
          Service
        </li>
        <li>
          Protect the personal safety of Users of the Service or the public
        </li>
        <li>Protect against legal liability</li>
      </ul>
      <h3>Security of Your Personal Data</h3>
      <p>
        The security of Your Personal Data is important to Us, but remember that
        no method of transmission over the Internet, or method of electronic
        storage is 100% secure. While We strive to use commercially acceptable
        means to protect Your Personal Data, We cannot guarantee its absolute
        security.
      </p>
      <h2>Children's Privacy</h2>
      <p>
        Our Service does not address anyone under the age of 13. We do not
        knowingly collect personally identifiable information from anyone under
        the age of 13. If You are a parent or guardian and You are aware that
        Your child has provided Us with Personal Data, please contact Us. If We
        become aware that We have collected Personal Data from anyone under the
        age of 13 without verification of parental consent, We take steps to
        remove that information from Our servers.
      </p>
      <p>
        If We need to rely on consent as a legal basis for processing Your
        information and Your country requires consent from a parent, We may
        require Your parent's consent before We collect and use that
        information.
      </p>
      <h2>Links to Other Websites</h2>
      <p>
        Our Service may contain links to other websites that are not operated by
        Us. If You click on a third party link, You will be directed to that
        third party's site. We strongly advise You to review the Privacy Policy
        of every site You visit.
      </p>
      <p>
        We have no control over and assume no responsibility for the content,
        privacy policies or practices of any third party sites or services.
      </p>
      <h2>Changes to this Privacy Policy</h2>
      <p>
        We may update Our Privacy Policy from time to time. We will notify You
        of any changes by posting the new Privacy Policy on this page.
      </p>
      <p>
        We will let You know via email and/or a prominent notice on Our Service,
        prior to the change becoming effective and update the &quot;Last
        updated&quot; date at the top of this Privacy Policy.
      </p>
      <p>
        You are advised to review this Privacy Policy periodically for any
        changes. Changes to this Privacy Policy are effective when they are
        posted on this page.
      </p>
      <h2>Contact Us</h2>
      <p>
        If you have any questions about this Privacy Policy, You can contact us:
      </p>
      <ul>
        <li>
          By email:{" "}
          <a href="mailto:info@sppdatadepot.com.ng">info@sppdatadepot.com.ng</a>
        </li>
      </ul>
    </div>

          </div>
          <p className="text-center capitalize">
            All right reserved &copy; {new Date().getFullYear()} Designed &
            developed by{" "}
            <a
              className="text-blue-500"
              href="https://onisabi-portfolio.netlify.app/"
              target="blank"
            >
              Oniboy
            </a>
          </p>
        </div>
      </section>{" "}
    </div>
  );
};

export default Landing;
