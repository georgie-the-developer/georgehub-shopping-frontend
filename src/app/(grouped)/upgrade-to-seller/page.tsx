"use client";
import upgradeToSeller from "@/styles/modules/login.module.scss";
import * as Form from "@/components/form/Form";
import { useAlert } from "@/contexts/AlertContext";
import { useUser } from "@/contexts/UserContext";
import { redirect } from "next/navigation";
import { useTransition } from "react";
import { requestConfirmCode } from "@/helpers/request-confirmation-code";
import config from "config.json";

export default function Page() {
  const { showAlert } = useAlert();
  const { user } = useUser();
  const [isPending, startTransition] = useTransition();
  const handleUpgradeToSellerSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(async () => {
      const data = {
        address: e.target["address"].value,
        full_name: e.target["full_name"].value,
        card_number: e.target["card_number"].value,
        role: "seller",
      };
      console.log(data);
      const result = await requestConfirmCode(user.email);
      if (result) {
        showAlert("Confrimation code sent successfully");
        const searchParams = new URLSearchParams(data).toString();
        window.location.href = `/upgrade-to-seller/confirm?${searchParams}`;
      } else {
        showAlert("Failed to send confirmation code");
      }
    });
  };
  return (
    <div className={upgradeToSeller.container}>
      <div className={upgradeToSeller.heading}>Upgrade to seller</div>
      <div className={upgradeToSeller.formContainer}>
        <Form.Form handleSubmit={handleUpgradeToSellerSubmit}>
          <Form.FormInput
            type="text"
            name="address"
            label="Address"
            placeholder="Enter your REAL address"
            pattern=".{20}$"
            patternMessage="Address should be at least 20 characters long."
            required={true}
          />
          <Form.FormInput
            type="text"
            name="full_name"
            label="Full name"
            placeholder="Enter your REAL full name"
            pattern=".{4}$"
            patternMessage="Full name should be at least 4 characters long."
            required={true}
          />
          <Form.FormInput
            type="text"
            pattern="^(\d{4} \d{4} \d{4} \d{4})$"
            patternMessage="Please follow the credit card pattern"
            name="card_number"
            label="Bank account number"
            placeholder="Enter your bank account number"
            required={true}
          />
          <div className={upgradeToSeller.termsContainer}>
            <Form.FormCheckbox
              label={"I agree to the"}
              name={"terms_agreement"}
              required={true}
            />
            <div className={upgradeToSeller.linksContainer}>
              <Form.FormLink title="Terms of service" link="#" />
              <span>and</span>
              <Form.FormLink title="Privacy policy" link="#" />
            </div>
          </div>
          <Form.FormSubmit value="Upgrade to seller" isPending={isPending} />
        </Form.Form>
      </div>
    </div>
  );
}
