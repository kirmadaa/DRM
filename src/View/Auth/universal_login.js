import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import LogoNew from "../../assets/images/logo/logoNew.svg";
import { useNavigate } from "react-router-dom";
// const Cryptr = require("cryptr");
// const cryptr = new Cryptr("trythat_universal");
const CryptoJS = require("crypto-js");

const UniversalLogin = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const searchParams = useSearchParams();

  useEffect(() => {
    let myToken = window.location.search;
    let ciphertext = myToken.split("=")[1];

    // let ciphertext = "U2FsdGVkX19YDMn1E7T+Xe6V9B6znopIh5KCT8M1lNVy8wVbLC8QEIoLABeuvGKJUd53LmvtMZt2TGAv2vHp5RzIw32nDm+82T+vy82GVaTEeFcoExNohKccxv4cwpsUe9o0fAR6+EJWvY/DuKrVW6kfvnyLneLMH/MZ4IEPTwgzU3sUbKPhzkzrIsH33EGYEzuz5i/mprwFrcdSD887Hlbx5p6igGYoaLG1g1IfjQieROa8ILktFXw0ygOAAWMvtLyNNRKw73OhmDwmTOIpzxNzYs5Bb1PJHwynVyKqidLq2qJfHQWWTLtwgz3m5JXYEzr+tH5pIJVX9xu6CSJvn4AozfJxweZgE8QR3c6iOHZ1fPWKt6co3xMI022EJ1ovAj/agK8x2iGGVkVBk4GGvp9MO4xwBzc4YVpzsHah5Ab9HjoIGSzHMCy/HzgiXzpNAKbx/FHxQ/f4fuYmwRCqYYCqSGKCnVH/23pwnvx1wgt10bIQbeSjHknEernxqiUJBerPTzdTII4QSFPopQqKLTDn1Kof8NdMhn/h0z5pAuaFYYNBT7Eld8AxW40VUXYitpjZ5YfrTmVYpXWOu8hgO16wzQZhauAuTg/9Lb3mR3MqnAkyGblkl4ppeSNanfgbzak1o0hifJm3CBcIpJ5cPydodYWM15wayx4tX93p2yB3JN+/9uhCOIsjD3SL2YMZGI/slx/CkxmfN2iBPm1NFpph68oqgORJOY5e2Ehpf1UIntE4UKZOnG/WvQGsU0cb4wCgQ+reZIrbXfl/Mr7RT4+KQLaIQ+7xE2b3H4MSLc6bvKpqTZV4unomOnp+eIHlZAGkH4H270Qf2AsoT4f2LP7Q2WXbtQLHEMZcaMBoQBXe6qS/pWMnS4DdJuS3bxAr"
    console.log("myToken==>", ciphertext);
    // const getUrl=getParams()
    // url?auth='44eaff8280813856e205eda42ee005add18d8767f50178f577975c698e721c4495d687463ebda955fac1065a24d3b85db95e09293ac622a0df51ab86f596879f379944bead49227e249a97b554657f1dc130e74f8b086439f95badf16051d50dc8615783443fc9d142c0aaa91a5f4bba9cb8ac5b527c6cb4a5fa81513553de2044f2b3b12614b01ac9b3856acbe9763b18ffc6ed5dfccb98b001eca183f90f760d7fd1e9881438971c35621fc5e1eb72e7e9e5fbcb2f0e5bfe322b01e4a6b06d858ad4cfaef956be4e77e1bf65288ccb9e57457bdce9870f0b56d0faaa7aebf2d90b87b69996511135c9d52c98fcbc85ac765777d767d2d4b00e0b549d6e0bcff98b684400da8b2db2e7a5672b1da372bda542646db3937023cf1618ca28e41b48e4f63882f342983f54b8bb04a6db8bf9cc5ec8d9c2a4c5aa6fe102e1cd6f057b1462b3973855be564da6415632a7837b4d7e939734d68548e28180e6acf325c5bf2da611ddcb4a8c95c15e626fd5ba3829a827280ba51b6d075f4f2be132f260c02a04e2fba63322ed4cc664a51bd3b00963915ad9e6fa8da55c9d715034401f9bd1afd7c4532e64fc7d553fc8e464665c6861a0de018117e39b2ffa258e954faba62daf7e6e776fa9201efc35428cc925e92ec59b3e5392c94d11d6a5cece7666bc848dffbcf7c1c5ef9b19e4204ccdcf99b8c642547af4a323eff425fd7c7c984ed5fd8406cc349ae28bcef9dc3ad7b26ba0aa09c2b14cbb4961fe9425d3d1de996d2a30cf9dac60914de241b5716314e1d9b08b6e7d5a0f9803e9dbfb24775f9168445bf5863a4edbbb8928e0afc2283bdb72ef7fe37a95e77bb034cb920f70441d4995a4d6dc480b1dcf61722edabeb1cf09e8ef84a74df561c34eec57712ee5c9505b5521d2355e5e9366e5f15695ea9b91f7bd12ae13ce7e62aa47983d05164572c55e780dec54eb72e9dc86dbc20b0bf06576ce4ab45f4fff4372a9278914c84cb0543b7da687a02c82d061b49a471d3ff4598973014332222150bf7ffaeb36d0f8'
    // let params = "?token=e463e2fec86f1249f6391c0fadf7ce74bcc2904c77ed496006919811c31dfe3cd3ae586f7116f9c6d989352816d343a3a29512c6b869629fb4d8bbfa4c20eea59fcb3d9bbd064ab46217d89425b419aea760b27c3e69dfc76a45271d9d1b8310ad0fbc6b64b204f9ed256cc49260eca0f500c0ae3dbaf32b81bf6ce9ecf88486d23861b83c526b33c92ff39ccccd684d5ae71b0d2c0cb7f40094a78fab1b81ecbc7151cdb897fa68dcdd92aeb2a4de2bc"
    // let data = {
    //   accessToken:
    //     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJDUk0iLCJhdWQiOiJDUk0iLCJ1c2VySWQiOiI2NWVhZDNkYjM4N2JiM2FhY2Q2MTM3YjEiLCJuYW1lIjoidmlzaGFsIiwidHlwZSI6IkFjY2VzcyIsImp0aSI6IjMxODQ2ZDc4MmY5MTY4MjJiMDdlIiwiaWF0IjoxNzA5ODg4NDc1LCJleHAiOjE3MTAwNjEyNzV9.JrLjGHz91gktSf8Kk5xltmgVZ0i_2rzSmd1K5SmBwAs",
    //   refreshToken:
    //     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJDUk0iLCJhdWQiOiJDUk0iLCJ1c2VySWQiOiI2NWVhZDNkYjM4N2JiM2FhY2Q2MTM3YjEiLCJuYW1lIjoidmlzaGFsIiwidHlwZSI6IlJlZnJlc2giLCJqdGkiOiI1ZTNkMGVkMmZlNThlNTA1M2Y0ZSIsImlhdCI6MTcwOTg4ODQ3NSwiZXhwIjoxNzA5OTc0ODc1fQ.erc2LEtLCPHrowja62MIOqk8tTRAraQUJxbdckc6bR0",
    //   userData: {
    //     email: {
    //       verified: true,
    //     },
    //     roleTitle: "CEO",
    //     profile: "65ead3db387bb3aacd6137b2",
    //     _id: "65ead3db387bb3aacd6137b1",
    //   },
    // };

    // // Encrypt
    // var ciphertext1 = CryptoJS.AES.encrypt(
    //   JSON.stringify(data),
    //   "my-secret-key@123"
    // ).toString();
    // console.log("<<-->>", ciphertext1);
    // Decrypt

    //return;

    let bytes = CryptoJS.AES.decrypt(ciphertext, "my-secret-key@123");
    let decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    console.log("==>decryptedData", decryptedData);
    let res = decryptedData;

    //         const encryptedString = cryptr.encrypt(
    //             `{"accessToken":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJDUk0iLCJhdWQiOiJDUk0iLCJ1c2VySWQiOiI2NWM0NjI4YWIzM2Y1NWQ3YzViOTdiMDMiLCJ0eXBlIjoiQWNjZXNzIiwianRpIjoiNjBmYTgyYTM0OTA2MWFkMTI0M2YiLCJpYXQiOjE3MDk0NTQxMTUsImV4cCI6MTcwOTYyNjkxNX0.ES9sfTs6XUv0z3wY99JBKYyazLHvCgkbyFDi17rjNYc",
    //   "refreshToken":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJDUk0iLCJhdWQiOiJDUk0iLCJ1c2VySWQiOiI2NWUzNGQzOTQwZDljN2VjOGQ2YmRjODMiLCJ0eXBlIjoiUmVmcmVzaCIsImp0aSI6IjJiYjI2MDc4MTI3Y2UyNDZkZTc1IiwiaWF0IjoxNzA5NDUzMTIwLCJleHAiOjE3MDk1Mzk1MjB9.WRMoQSgij2W-EcjDysoRDtWliArnIePiedxfI2ThOTk",
    //   +"userData":{"email":{"verified":false},"_id":"65e34d3940d9c7ec8d6bdc83"}}`
    //         );
    // const encryptedString = cryptr.encrypt(
    //   '{"accessToken":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJDUk0iLCJhdWQiOiJDUk0iLCJ1c2VySWQiOiI2NWUzNGQzOTQwZDljN2VjOGQ2YmRjODMiLCJ0eXBlIjoiQWNjZXNzIiwianRpIjoiODE3MWRhNzRlZDUzYzY5NmUyNTMiLCJpYXQiOjE3MDk0NTMxMjAsImV4cCI6MTcwOTYyNTkyMH0.FVMPHrRjr_Mz9PA8VrJrrBE2Z9ISyFuacwBdZmQ3SW4","refreshToken":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJDUk0iLCJhdWQiOiJDUk0iLCJ1c2VySWQiOiI2NWUzNGQzOTQwZDljN2VjOGQ2YmRjODMiLCJ0eXBlIjoiUmVmcmVzaCIsImp0aSI6IjJiYjI2MDc4MTI3Y2UyNDZkZTc1IiwiaWF0IjoxNzA5NDUzMTIwLCJleHAiOjE3MDk1Mzk1MjB9.WRMoQSgij2W-EcjDysoRDtWliArnIePiedxfI2ThOTk","userData":{"email":{"verified":false},"_id":"65e34d3940d9c7ec8d6bdc83"}}'
    // );

    // console.log(encryptedString); // 2a3260f5ac4754b8ee3021ad413ddbc11f04138d01fe0c5889a0dd7b4a97e342a4f43bb43f3c83033626a76f7ace2479705ec7579e4c151f2e2196455be09b29bfc9055f82cdc92a1fe735825af1f75cfb9c94ad765c06a8abe9668fca5c42d45a7ec233f0

    // url?auth='44eaff8280813856e205eda42ee005add18d8767f50178f577975c698e721c4495d687463ebda955fac1065a24d3b85db95e09293ac622a0df51ab86f596879f379944bead49227e249a97b554657f1dc130e74f8b086439f95badf16051d50dc8615783443fc9d142c0aaa91a5f4bba9cb8ac5b527c6cb4a5fa81513553de2044f2b3b12614b01ac9b3856acbe9763b18ffc6ed5dfccb98b001eca183f90f760d7fd1e9881438971c35621fc5e1eb72e7e9e5fbcb2f0e5bfe322b01e4a6b06d858ad4cfaef956be4e77e1bf65288ccb9e57457bdce9870f0b56d0faaa7aebf2d90b87b69996511135c9d52c98fcbc85ac765777d767d2d4b00e0b549d6e0bcff98b684400da8b2db2e7a5672b1da372bda542646db3937023cf1618ca28e41b48e4f63882f342983f54b8bb04a6db8bf9cc5ec8d9c2a4c5aa6fe102e1cd6f057b1462b3973855be564da6415632a7837b4d7e939734d68548e28180e6acf325c5bf2da611ddcb4a8c95c15e626fd5ba3829a827280ba51b6d075f4f2be132f260c02a04e2fba63322ed4cc664a51bd3b00963915ad9e6fa8da55c9d715034401f9bd1afd7c4532e64fc7d553fc8e464665c6861a0de018117e39b2ffa258e954faba62daf7e6e776fa9201efc35428cc925e92ec59b3e5392c94d11d6a5cece7666bc848dffbcf7c1c5ef9b19e4204ccdcf99b8c642547af4a323eff425fd7c7c984ed5fd8406cc349ae28bcef9dc3ad7b26ba0aa09c2b14cbb4961fe9425d3d1de996d2a30cf9dac60914de241b5716314e1d9b08b6e7d5a0f9803e9dbfb24775f9168445bf5863a4edbbb8928e0afc2283bdb72ef7fe37a95e77bb034cb920f70441d4995a4d6dc480b1dcf61722edabeb1cf09e8ef84a74df561c34eec57712ee5c9505b5521d2355e5e9366e5f15695ea9b91f7bd12ae13ce7e62aa47983d05164572c55e780dec54eb72e9dc86dbc20b0bf06576ce4ab45f4fff4372a9278914c84cb0543b7da687a02c82d061b49a471d3ff4598973014332222150bf7ffaeb36d0f8'
    // let a = '44eaff8280813856e205eda42ee005add18d8767f50178f577975c698e721c4495d687463ebda955fac1065a24d3b85db95e09293ac622a0df51ab86f596879f379944bead49227e249a97b554657f1dc130e74f8b086439f95badf16051d50dc8615783443fc9d142c0aaa91a5f4bba9cb8ac5b527c6cb4a5fa81513553de2044f2b3b12614b01ac9b3856acbe9763b18ffc6ed5dfccb98b001eca183f90f760d7fd1e9881438971c35621fc5e1eb72e7e9e5fbcb2f0e5bfe322b01e4a6b06d858ad4cfaef956be4e77e1bf65288ccb9e57457bdce9870f0b56d0faaa7aebf2d90b87b69996511135c9d52c98fcbc85ac765777d767d2d4b00e0b549d6e0bcff98b684400da8b2db2e7a5672b1da372bda542646db3937023cf1618ca28e41b48e4f63882f342983f54b8bb04a6db8bf9cc5ec8d9c2a4c5aa6fe102e1cd6f057b1462b3973855be564da6415632a7837b4d7e939734d68548e28180e6acf325c5bf2da611ddcb4a8c95c15e626fd5ba3829a827280ba51b6d075f4f2be132f260c02a04e2fba63322ed4cc664a51bd3b00963915ad9e6fa8da55c9d715034401f9bd1afd7c4532e64fc7d553fc8e464665c6861a0de018117e39b2ffa258e954faba62daf7e6e776fa9201efc35428cc925e92ec59b3e5392c94d11d6a5cece7666bc848dffbcf7c1c5ef9b19e4204ccdcf99b8c642547af4a323eff425fd7c7c984ed5fd8406cc349ae28bcef9dc3ad7b26ba0aa09c2b14cbb4961fe9425d3d1de996d2a30cf9dac60914de241b5716314e1d9b08b6e7d5a0f9803e9dbfb24775f9168445bf5863a4edbbb8928e0afc2283bdb72ef7fe37a95e77bb034cb920f70441d4995a4d6dc480b1dcf61722edabeb1cf09e8ef84a74df561c34eec57712ee5c9505b5521d2355e5e9366e5f15695ea9b91f7bd12ae13ce7e62aa47983d05164572c55e780dec54eb72e9dc86dbc20b0bf06576ce4ab45f4fff4372a9278914c84cb0543b7da687a02c82d061b49a471d3ff4598973014332222150bf7ffaeb36d0f8'
    // const decryptedString = cryptr.decrypt(
    //     a
    // );
    // console.log(JSON.parse(decryptedString));
    // let res = JSON.parse(decryptedString)
    // // console.log(res)

    if (!res) {
      navigate("/crm/support-contact");
    }
    if (res?.userData?.email?.verified) {
      localStorage.setItem("token", res.accessToken);
      localStorage.setItem("refreshToken", res?.refreshToken);
      localStorage.setItem("userData", JSON.stringify(res));
      navigate("/crm/dashboard");
    }
    if (res?.userData?.email?.verified === false) {
      setError("Please verify your email");
    }
    if (res?.error) {
      setError("Email or password is incorrect");
    }
  }, []);
  // let mytoken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJDUk0iLCJhdWQiOiJDUk0iLCJ1c2VySWQiOiI2NWM0NjI4YWIzM2Y1NWQ3YzViOTdiMDMiLCJ0eXBlIjoiQWNjZXNzIiwianRpIjoiNjBmYTgyYTM0OTA2MWFkMTI0M2YiLCJpYXQiOjE3MDk0NTQxMTUsImV4cCI6MTcwOTYyNjkxNX0.ES9sfTs6XUv0z3wY99JBKYyazLHvCgkbyFDi17rjNYc"

  return (
    <>
      <section className="flex items-center h-screen p-16">
        <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8">
          <div className="text-center">
            <div className="flex justify-start items-center">
              <h2 className="font-bold text-7xl">
                <span className="text-primary mr-1">Welcome to</span>
              </h2>
              <img
                src={LogoNew}
                // className="lg:left-24"
                alt="login-banner"
              />
            </div>
            {error && (
              <>
                <div className="text-red-500">{error}.</div>
              </>
            )}
            <Link
              to="/crm/login"
              className="px-8 py-3 font-semibold rounded-2xl text-white bg-primary"
            >
              Login
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default UniversalLogin;
