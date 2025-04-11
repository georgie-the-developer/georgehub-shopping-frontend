"use client";
import upgradeToSeller from "@/styles/modules/login.module.scss";
import * as Form from "@/components/form/Form";
export default function Page() {
  return (
    <div className={upgradeToSeller.container}>
      <div className={upgradeToSeller.heading}>Upgrade to seller</div>
      <div className={upgradeToSeller.formContainer}>
        <Form.Form
          handleSubmit={async (e) => {
            e.preventDefault();
          }}
        >
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
          <Form.FormSubmit value="Upgrade to seller" />
        </Form.Form>
      </div>
    </div>
  );
}
