import React from "react";
import { APIClient, Openlaw } from "openlaw";
import { Container, LinearProgress, Button } from "@material-ui/core";
import "dotenv";
import OpenLawForm from "openlaw-elements";
//import "../../../node_modules/openlaw-elements/dist/openlaw-elements.min.css";


require("dotenv").config();

const EFFECTIVE_DATE = "Effective Date";
const LANDLORD_NAME = "Landlord Name";
const TENANT_NAME = "Tenant Name";
const PROPERTY_NAME = "Property name";
const LEASE_COMMENCEMENT_DATE = "Lease begin date";
const LEASE_TERMINATION_DATE = "Lease end date";
const RENT_AMOUNT = "Amount of Rent Due";
const RENT_DUE_DATE = "Date rent is due";
const RETURNED_CHECK_FEE = "Fee for returned checks";
const RENT_INCREASE_DATE = "Date rent increases after default";
const SECURITY_DEPOSIT_AMOUNT = "Amount due for security deposit";
const PREMISES_DESCRIPTION = "Description of property";
const DAILY_ANIMAL_RESTRICTION_VIOLATION_FEE = "Fee for having animals";
const LANDLORD_NOTICE_ADDRESS = "Notice for mail to landlord";
const LANDLORD_EMAIL = "contact email for landlord";
const TENANT_EMAIL = "contact email for tenant";

const URL = "https://lib.openlaw.io/api/v1/default"; //url for your openlaw instance eg. "http://myinstancename.openlaw.io"
const TEMPLATE_NAME = "LEASE ON THE BLOCK"; //name of template stored on Openlaw
const OPENLAW_USER = "phuong.nguyen@sotatek.com"; //add your Openlaw login email
const OPENLAW_PASSWORD = "123456Aa@"; //add your Openlaw password
//create config
console.log("user: " + process.env.REACT_APP_OPENLAW_USER);
const openLawConfig = {
  server: URL,
  templateName: TEMPLATE_NAME,
  userName: OPENLAW_USER,
  password: OPENLAW_PASSWORD
};

const apiClient = new APIClient(URL);

class CreateLease extends React.Component {
  // initial state declaration
  state = {
    // Template values
    Effective_Date: undefined,
    Landlord_Name: undefined,
    Tenant_Name: undefined,
    Property_Location: undefined,
    Lease_Commencement_Date: undefined,
    Lease_Termination_Date: undefined,
    Rent_Amount: undefined,
    Rent_Due_Date: undefined,
    Returned_Check_Fee: undefined,
    Rent_Increase_Date: undefined,
    Security_Deposit_Amount: undefined,
    Premises_Description: undefined,
    Daily_Animal_Restriction_Violation_Fee: undefined,
    Landlord_Notice_Address: undefined,
    Landlord_Email: undefined,
    Tenant_Email: undefined,

    // OpenLaw variables
    title: "",
    template: "",
    creatorId: "",
    compiledTemplate: null,
    parameters: {},
    executionResult: null,
    variables: null,
    draftId: "",

    UserObject: {}
  };

  componentDidMount = async () => {
    try {
      // Instantiate OpenLaw API, log in
      apiClient
        .login(openLawConfig.userName, openLawConfig.password)
        .then(console.log);
      console.log("logged in!");

      //Retrieve your OpenLaw template by name
      const template = await apiClient.getTemplate(openLawConfig.templateName);

      //Pass the returned object's title into a variable
      const title = template.title;

      //Pass the template content into a variable
      const myContent = template.content;
      console.log("Template content: ", myContent);

      //Get the most recent version of the template
      const versions = await apiClient.getTemplateVersions(
        openLawConfig.templateName,
        20,
        1
      );
      console.log("Template versions: ", versions[0], versions.length);

      //Get the creatorID from the template.
      const creatorId = versions[0].creatorId;
      console.log("creatorId..", creatorId);

      //Get my compiled Template
      const compiledTemplate = await Openlaw.compileTemplate(myContent);
      if (compiledTemplate.isError) {
        throw "Template errror: " + compiledTemplate.errorMessage;
      }
      this.setState({ compiledTemplate });
      console.log("content inside didMount: " + this.state.template.content);

      const parameters = {};
      const { executionResult, errorMessage } = await Openlaw.execute(
        compiledTemplate.compiledTemplate,
        {},
        parameters
      );

      console.log("execution result: ", executionResult);

      if (errorMessage) {
        console.error("OpenLaw Execution Error: ", errorMessage);
      }

      const variables = await Openlaw.getExecutedVariables(executionResult, {});
      console.log("variables:", variables);

      this.setState({
        title,
        template,
        creatorId,
        compiledTemplate,
        parameters,
        executionResult,
        variables
      });
    } catch (error) {
      //try
      console.log("unsuccessful submission", error);
    }
  };

  onChange = (key, value) => {
    switch (key) {
      case EFFECTIVE_DATE:
        this.setState({ Effective_Date: value });
        break;
      case LANDLORD_NAME:
        this.setState({ Landlord_Name: value });
        break;
      case TENANT_NAME:
        this.setState({ Tenant_Name: value });
        break;
      case PROPERTY_NAME:
        this.setState({ Property_Name: value });
        break;
      case LEASE_COMMENCEMENT_DATE:
        this.setState({ Lease_Commencement_Date: value });
        break;
      case LEASE_TERMINATION_DATE:
        this.setState({ Lease_Termination_Date: value });
        break;
      case RENT_AMOUNT:
        this.setState({ Rent_Amount: value });
        break;
      case RENT_DUE_DATE:
        this.setState({ Rent_Due_Date: value });
        break;
      case RETURNED_CHECK_FEE:
        this.setState({ Returned_Check_Fee: value });
        break;
      case RENT_INCREASE_DATE:
        this.setState({ Rent_Increase_Date: value });
        break;
      case SECURITY_DEPOSIT_AMOUNT:
        this.setState({ Security_Deposit_Amount: value });
        break;
      case PREMISES_DESCRIPTION:
        this.setState({ Premises_Description: value });
        break;
      case DAILY_ANIMAL_RESTRICTION_VIOLATION_FEE:
        this.setState({ Daily_Animal_Restriction_Violation_Fee: value });
        break;
      case LANDLORD_NOTICE_ADDRESS:
        this.setState({ Landlord_Notice_Address: value });
        break;
      case LANDLORD_EMAIL:
        this.setState({ Landlord_Email: value });
        break;
      case TENANT_EMAIL:
        this.setState({ Tenant_Email: value });
        break;
      default:
        break;
    }
    console.log("KEY: ", key, "VALUE: ", value);
  };

  executeContract = () => {
    const {
      // Template values
      Effective_Date,
      Landlord_Name,
      Tenant_Name,
      Property_Name,
      Lease_Commencement_Date,
      Lease_Termination_Date,
      Rent_Amount,
      Rent_Due_Date,
      Returned_Check_Fee,
      Rent_Increase_Date,
      Security_Deposit_Amount,
      Premises_Description,
      Daily_Animal_Restriction_Violation_Fee,
      Landlord_Notice_Address,
      Landlord_Email,
      Tenant_Email
    } = this.state;

    const execParameters = {
      [EFFECTIVE_DATE]: Effective_Date,
      [LANDLORD_NAME]: Landlord_Name,
      [TENANT_NAME]: Tenant_Name,
      [PROPERTY_NAME]: Property_Name,
      [LEASE_COMMENCEMENT_DATE]: Lease_Commencement_Date,
      [LEASE_TERMINATION_DATE]: Lease_Termination_Date,
      [RENT_AMOUNT]: Rent_Amount,
      [RENT_DUE_DATE]: Rent_Due_Date,
      [RETURNED_CHECK_FEE]: Returned_Check_Fee,
      [RENT_INCREASE_DATE]: Rent_Increase_Date,
      [SECURITY_DEPOSIT_AMOUNT]: Security_Deposit_Amount,
      [PREMISES_DESCRIPTION]: Premises_Description,
      [DAILY_ANIMAL_RESTRICTION_VIOLATION_FEE]: Daily_Animal_Restriction_Violation_Fee,
      [LANDLORD_NOTICE_ADDRESS]: Landlord_Notice_Address,
      [LANDLORD_EMAIL]: Landlord_Email,
      [TENANT_EMAIL]: Tenant_Email
    };

    const signatures = {
      "Oliver Renwick": "Oliver Renwick"
    };

    try {
      Openlaw.executeForReview(
        this.state.compiledTemplate,
        signatures,
        {},
        execParameters
      );
    } catch (error) {
      //end try

      console.log("unsuccessful submission", error);
    }
  };

  render() {
    const { variables, parameters, executionResult } = this.state;
    if (!executionResult) return <LinearProgress />;
    return (
      <Container style={{ marginTop: "7em" }}>
        <h1>Lease On The Block</h1>
        <OpenLawForm
          apiClient={apiClient}
          executionResult={executionResult}
          parameters={parameters}
          onChangeFunction={this.onChange}
          openLaw={Openlaw}
          variables={variables}
        />
        <Button onClick={this.executeContract}>Submit for Signatures</Button>
      </Container>
    );
  }
}

export default CreateLease;