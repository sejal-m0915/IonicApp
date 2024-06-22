
export class GetIPAddress {
    public Ip_address!: string;
}

export class PostToken {
    public flag!: string;
    public User_Type!: string;
    public User_Nm!: string;
    public Password!: string;
    public Ip_Address!: string;
    public Application_Source!: string;
    public Is_External!: boolean;
    public Secret_Key!: string;
    public Activity!: string;
    public Actv_Ind!: Number;
    public OTP!: string;
    public Role_Cd!: string;
    public Session_ID!: string;
    public User_Group_Id!: Number;
}

export class GetToken {
    public Access_Token!: string;
    public Token_Issue!: Date;
    public Token_Expire!: Date;
    public Refresh_Token!: string;
}

export class GetValidateEntityCredential {
    public Flag!: string;
    public Type!: string;
    public User_Nm!: string;
    public Password!: string;
}


export class GetPolicyInsured {
    public Actv_Flag!: Number;
    public Actv_Ind!: Number;
    public Age_Year!: Number;
    public Alchol_Ind!: Number;
    public Alcohal_Count!: string;
    public Annual_Income!: string;
    public Beer_Count!: string;
    public Blood_Group!: string;
    public Bmi!: Number;
    public Deductible_Sum_Insured!: Number;
    public Diet!: string;
    public Disability_Details!: string;
    public Dob!: Date;
    public Earning_Ind!: Number;
    public Employment_Dt!: string;
    public Exercise_Ind!: Number;
    public First_Nm!: string;
    public Full_Nm!: string;
    public Gender!: string;
    public Group_Cd!: string;
    public Height!: string;
    public Initials_Nm!: string;
    public Injury_Details!: string;
    public Injury_Ind!: Number;
    public Insured_Cd!: string;
    public Last_Nm!: string;
    public Lst_Updt_Dt!: string;
    public Lst_Updt_Ip_Addr!: string;
    public Lst_Updt_Usr!: Number;
    public Maiden_Nm!: null;
    public Marital_Status!: string;
    public Member_Cd!: string;
    public Middle_Nm!: string;
    public Monthly_Income!: null;
    public Nationality!: string;
    public Occupation_Cd!: string;
    public Occupation_Nm!: string;
    public Other_Count!: string;
    public Other_Ind!: string;
    public Panmasala_Count!: string;
    public Panmasala_Ind!: Number;
    public PolicyGroup_Id!: Number;
    public PolicyInsured_Id!: Number;
    public PolicyRisk_Id!: Number;
    public PolicyVersion_Id!: Number;
    public Policy_Id!: Number;
    public Political_Exposed_Details!: string;
    public Political_Exposed_Ind!: Number;
    public Preexisting_Desc!: string;
    public Preexisting_Ind!: Number;
    public Primary_Insured!: Number;
    public Qualification!: string;
    public Relation_Category!: string;
    public Relation_Cd!: string;
    public Relation_Nm!: string;
    public RiskClass_Cd!: string;
    public Risk_End_Dt!: Date;
    public Risk_Premium!: Number;
    public Risk_Start_Dt!: Date;
    public Smoking_Count!: string;
    public Smoking_Ind!: Number;
    public Sport_Club!: string;
    public Sum_Insured!: Number;
    public Takeover_Joining_Dt!: string;
    public Termination_Dt!: string;
    public Title!: string;
    public UID!: string;
    public Weight!: string;
    public Wine_Count!: string;
}

export class GetUsers {
    public Flag!: string;
    public Id!: Int16Array;
    public User_Id!: Int16Array;
    public User_Group_Id!: Int16Array;
    public User_Nm!: string;
    public Branch_Cd!: string;
    public First_Nm!: string;
    public Last_Nm!: string;
    public Employee_Cd!: string;
    public Department_Cd!: string;
    public Role_Cd!: string;
    public UserGroup_Id!: Int16Array;
    public Actv_Ind!: Int16Array;
    public OTP!: string;
    public __RequestVerificationToken!: string;
}

export class PostUser {
    public Id!: Number;
    public User_Nm!: string;
    public Mode!: string;
    public Lst_Login_Dt!: string;
    public Actv_Ind!: Number;
}

export class GenOtp {
    public Id!: Number;
    public User_Nm!: string;
    public Mode!: string;
    public Lst_Login_Dt!: string;
    order_Id: any;
}

export class PostGenOtp {
    public Flag!: string;
    public Order_Id!: string;
    public Mobile_No!: string;
    public Email!: string;
}

export class PostValidateOtp {
    public Flag!: string;
    public Order_Id!: string;
    public Mobile_No!: string;
    public OTP!: string;
    public User_Nm!: string;
    public Email!: string;
}

export class PostUsers {
    public Mode!: string;
    public Actv_Ind!: Number;
    public Id!: Number;
    public Branch_Cd!: string;
    public Branch_Nm !: string;
    public First_Nm!: string;
    public Last_Nm!: string;
    public Employee_Cd!: string;
    public Parent_Id!: Number;
    public User_Type!: string;
    public Title!: string;
    public User_Group_Id!: Number;
    public Gender!: string;
    public UserRole_Nm!: string;
    public UserGroup_Nm!: string;
    public User_Nm!: string;
    public Employee_Grade!: string;
    public User_Membership_Id!: string;
    public Designation_Cd!: string;
    public Department_Cd!: string;
    public Department_Nm!: string;
    public Designation_Nm!: string;
    public Function_Nm!: string;
    public Vertical_Cd!: string;
    public Sub_Vertical!: string;
    public Reporting_Manager_Cd!: string;
    public Reporting_Manager_Nm!: string;
    public Dob!: string;
    public Date_Of_Joining!: Date;
    public Pan_No!: string;
    public Qualificaion!: string;
    public Address_Line!: string;
    public City_Nm!: string;
    public District_Nm!: string;
    public State_Nm!: string;
    public Pin_Zip!: string;
    public Landline_No!: string;
    public Extension_No!: string;
    public Email!: string;
    public Img_Nm!: string;
    public Mobile!: Number;
    public Personal_Email!: string;
    public Personal_Mobile!: Number;
    public Experience_Yr!: Int16Array;
    public Password_Expiry_Dt!: Date;
    public User_Block_Ind!: Int16Array;
    public User_Block_Dt!: Date;
    public No_Of_Attempts!: Int16Array;
    public User_Ref_Cd!: string;
    public Location_Cd!: string;
    public Lst_Login_Dt!: string;
    public Lst_Updt_Dt!: Date;
    public Lst_Updt_Usr_Nm!: string;
    public File_Nm!: string;
    public Role_Cd!: string;
    public OTP!: string;
    public Mobile_No!: Number;
    public Order_Id!: string;
    public Status!: boolean;
    public To!: string;
    public Cc!: string;
    public Bcc!: string;
    public Attachment!: string;
    public Mail_Subject!: string;
    public Mail_Body!: string;
    public Mail_From!: string;
}


export class GetProposalList {
    public Action!: string;
    public Activity!: string;
    public Approved_Dt!: Date;
    public AuditExcelLog!: string;
    public AuditTrailID!: Number;
    public AuditUserNm!: string;
    public Auditlog!: string;
    public Cert_Action!: string;
    public Client_Cd!: string;
    public Client_Nm!: string;
    public Crtd_Dt!: Date;
    public Crtd_Ip_Addr!: string;
    public Dcn_No!: string;
    public DmsDoc!: string;
    public Draft_Ind!: Number;
    public Email!: string;
    public EndorsementFlag!: string;
    public Endorsement_Category!: string;
    public Endorsement_Cd!: string;
    public Endorsement_Nm!: string;
    public Event_Dt!: Date;
    public FamilyType_Cd!: string;
    public FirstVersion_Id!: Number;
    public Id!: string;
    public Industry_Nm!: string;
    public InfoXml!: string;
    public Intermediary_Action!: string;
    public Intermediary_Cd!: string;
    public Intermediary_Nm!: string;
    public Invoice_No!: string;
    public LastVersion_Id!: Number;
    public Lead_Cd!: string;
    public Lead_Status_Cd!: string;
    public Lst_Updt_Usr_Nm!: string;
    public MasterPolicy_No!: string;
    public Master_Policy_Id!: Number;
    public Master_Policy_Ind!: Number;
    public Medical_Doc!: string;
    public Mode!: string;
    public PolicyProposer_Id!: Number;
    public PolicySearch_No!: string;
    public PolicyVersion_Id!: Number;
    public PolicyVersion_No!: string;
    public Policy_End_Dt!: Date;
    public Policy_Id!: number;
    public Policy_No!: string;
    public Policy_Start_Dt!: Date;
    public Policy_Type!: string;
    public Policy_Type_Nm!: string;
    public Product_Cd!: string;
    public Product_Nm!: string;
    public Product_Type!: string;
    public Profile!: string;
    public Proposal_No!: string;
    public Proposal_Type!: string;
    public Quotation_No!: string;
    public Renewal_Ind!: Number;
    public Sales_Manager_Cd!: string;
    public Sales_Manager_Nm!: string;
    public Source_System_Nm!: string;
    public Status_Cd!: string;
    public Status_Grp!: string;
    public Status_Nm!: string;
    public Subsidiary_Cd!: string;
    public Suspension_Action!: string;
    public UID!: string;
    public UWWork_Action!: string;
    public Underwriting_Year!: Number;
    public User_Group_Nm!: string;
    public User_Nm!: string;
    public VW_Action!: string;
    public Version!: string;


}

export class ClientList {
    public Actv_Ind!: string;
    public Category!: string;
    public ClaimVersion_Id!: Number;
    public Claim_Id!: Number;
    public Client_Cd!: string;
    public Client_Nm!: string;
    public Dcn_No!: string;
    public Email1!: string;
    public Full_Nm!: string;
    public Id!: string;
    public Mailing_City!: string;
    public Mailing_Country!: string;
    public Mailing_District!: string;
    public Mailing_Landline_No1!: string;
    public Mailing_Landline_No2!: string;
    public Mailing_Mobile1!: string;
    public Mailing_Mobile2!: string;
    public Mailing_Pin_Zip!: string;
    public Mailing_State!: string;
    public Member_Cd!: string;
    public Membership_No!: string;
    public Mobile1!: string;
    public Mode!: string;
    public Page_Index!: string;
    public Page_Size!: string;
    public Pin_No!: string;
    public Pin_No1!: string;
    public PolicyVersion_Id!: Number;
    public Policy_Id!: number;
    public Policy_No!: string;
    public Provider_Type!: string;
    public Registration_No!: string;
    public Type!: string;
    public UID!: string;
}


export class PostClaimRegistration {
    public Actv_Ind!: Number;
    public Batch_Ind!: Number;
    public Batch_No!: string;
    public Benefit_Cd!: string;
    public Certificate_No!: string;
    public ClaimType_Cd!: string;
    public ClaimType_Nm!: string;
    public ClaimVersion_Id!: string;
    public Claim_Id!: string;
    public Claim_No!: string;
    public Claiment_Nm!: string;
    public Client_Cd!: string;
    public Client_Nm!: string;
    public Close_Audit_Remark!: string;
    public Close_Audit_Status!: string;
    public Communication!: string;
    public Concurrent_Amount!: Number;
    public Concurrent_Claim_No!: string;
    public Concurrent_Insurer_Nm!: string;
    public Concurrent_Policy_No!: string;
    public CostSaving_Amt!: Number;
    public Cover_Cd!: string;
    public Currency_Cd!: string;
    public DOA!: string;
    public DOD!: string;
    public Dependent_No!: string;
    public Disability_Cd!: string;
    public Document_Origin!: string;
    public Document_Source!: string;
    public EDMS_Barcode!: string;
    public ExGratia!: string;
    public Expected_DOA!: string;
    public Expected_DOD!: string;
    public FirstDocRec_Time!: string;
    public First_Doc_Dt!: Date;
    public First_Received_dt!: Date;
    public Flag!: string;
    public GOP_Flag!: string;
    public Incurred_Amt!: string;
    public Insured_Cd!: string;
    public Insured_Nm!: string;
    public Intimation_Dt!: string;
    public Invoice_No!: string;
    public IsCTCRequired!: Number;
    public IsConcurrentClaim!: Number;
    public IsFWARisk!: Number;
    public IsReferalLetterAttached!: Number;
    public IsSelfAdjudication!: Number;
    public LastDocRec_Time!: string;
    public Last_Doc_Dt!: Date;
    public Login_Nm!: string;
    public LossType_Cd!: string;
    public LossType_Nm!: string;
    public Loss_Dt!: string;
    public MasterPolicy_No!: string;
    public Member_Cd!: string;
    public Member_Nm!: string;
    public Mode!: string;
    public NHIFFlag!: Number;
    public NHIF_Amt!: Number;
    public NHIF_PackageFlag!: Number;
    public NHIF_Package_Amt!: Number;
    public NRICID!: string;
    public Open_Audit_Remark!: string;
    public Open_Audit_Status!: string;
    public Payable_Mode!: string;
    public Payable_To!: string;
    public Policy_Id !: Number;
    public Practice_Type!: string;
    public Priority!: string;
    public Procedure_Cd!: string;
    public Product_Cd!: string;
    public Product_Nm!: string;
    public Provider_Cd!: string;
    public Provider_Nm!: string;
    public Registration_Remarks!: string;
    public Reserve_Amt!: string;
    public Scheme_Cd!: string;
    public Scheme_Nm!: string;
    public Service_Category!: string;
    public Source_System_Nm!: string;
    public Status_Cd!: string;
    public Status_Nm!: string;
    public Status_Remarks!: string;
    public SubBenefit_Cd!: string;
    public TPA_Cd!: string;
    public TPA_Claim_No!: string;
    public TPA_Intimation_Dt!: string;
    public TPA_Nm!: string;
    public Visit_Id!: string;
    public WCF_Flag!: string;

}

export class PolicyProfilePolicyRiskCoverageObj {
    public Id!: Number;
    public Insured_Cd!: string;
    public Full_Nm!: string;
    public Plan_No!: string;
    public Cover_Cd!: string;
    public Cover_Nm!: string;
    public Cover_Type!: string;
    public Benefit_Cd!: string;
    public Benefit_Nm!: string;
    public Category!: string;
    public SubBenefit_Cd!: string;
    public SubBenefit_Nm!: string;
    public Product_Cd!: string;
    public Product_Nm!: string;
    public Scheme_Cd!: string;
    public Scheme_Nm!: string;
    public Expr1!: string;
    public Effective_From!: Date;
    public Limit_Type!: string;
    public Min_Limit!: Number;
    public OverwriteVisit_Limit!: Number;
    public OverwriteMax_Limit!: string;
    public Max_Limit!: string;
    public Benefit_Balance!: string;
    public Deductible!: string;
    public Total_Amount!: string;
    public Limit_Desc!: string;
    public Deductible_Type!: string;
    public Limit_Criteria!: string;
    public Unit!: Number;
    public Record_Order!: Number;
    public Limit_Capping_Days!: Number;
    public Visit_Limit!: Number;
    public Unit_Desc!: string;
    public Trigger_Cover!: string;
    public Utilization_Type!: string;
    public Criteria!: string;
    public Benefit_Category!: string;
    public Proration!: string;
    public Referral_Ind!: string;
    public Hospital_Type!: string;
    public Ward_Type!: string;
    public DisplayTag!: string;
    public Duration_Type!: string;
    public WaitingPeriod_Unit!: string;
    public Visit_Limit_Type!: string;
    public Effective_Upto!: Date;
    public Duration_From!: Number;
    public Duration_Upto!: Number;
    public WaitingPeriod_Value!: Number;
    public Class!: string;
    public Overseas_Factor!: string;
    public Type_of_CappingDays!: string;
    public Reim_Percent!: Number;
    public Remarks!: string;
    public Group_Cd!: string;
    public Action!: string;
    public Actionedit!: string;
    public Max_Visit_Limit!: Number;
    public Max_Visit_Limit_Type!: string;
    public Overwrite_Max_Visit_Limit!: string;
    public FundType!: string;
    public ProductCoverage_Id!: Number;
    public Cal_Type!: string;
    public BenefitStatus!: string;
    public Provider_Category!: string;
    public Risk_Start_Dt!: Date;
    public Risk_End_Dt!: Date;
}

export class GetProvider {
    public Actv_Ind!: string;
    public Audit_Flag!: string;
    public City_Nm!: string;
    public Client_Cd!: string;
    public Dcn_No!: string;
    public Flag!: string;
    public Id!: string;
    public Mode!: string;
    public Parent_Client_Cd!: string;
    public Pin_Zip!: string;
    public Policy_ID!: string;
    public ProviderType_Cd!: string;
    public Provider_Cd!: string;
    public Provider_Nm!: string;
    public Registration_No!: string;
    public Request_No!: string;
    public Status_Cd!: string;
}
export class GetPolicyNominee {
    public AppointeeRelation_Cd!: string;
    public Appointee_Address!: string;
    public Appointee_Cd!: string;
    public Appointee_Email!: string;
    public Appointee_Mobile!: string;
    public Appointee_Nm!: string;
    public Dob!: Date;
    public Email1!: string;
    public Lst_Updt_Dt!: Date;
    public Minor_Ind!: number;
    public Mobile1!: number;
    public NomineeRelation_Cd!: string;
    public Nominee_Address!: string;
    public Nominee_Cd!: string;
    public Nominee_Email!: string;
    public Nominee_Mobile!: string;
    public Nominee_Nm!: string;
    public Percentage!: string;
    public PolicyInsured_Id!: string;
    public Policy_Id!: string;
    public Policy_No!: string;
    public Share!: string;
}

export class GetClaimList {
    public Client_Cd!: string;
}

export class GetClientBank {
    public Id!: Number;
    public Bank_Type!: string;
    public Client_Cd!: string;
    public Bank_Cd!: string;
    public Bank_Nm!: string;
    public Bank_Branch_Cd!: string;
    public Bank_Branch_Nm!: string;
    public Account_No!: string;
    public Swift_Cd!: string;
    public Ifsc_Cd!: string;
    public Micr_Cd!: string;
    public Start_Dt!: Date;
    public Default!: string;
    public End_Dt!: Date;
    public Crtd_Usr!: Number;
    public Crtd_Dt!: string;
    public Crtd_Ip_Addr!: string;
    public Actv_Ind!: Number;
    public Lst_Updt_Dt!: string;
    public Lst_Updt_Usr!: Number;
    public Lst_Updt_Ip_Addr!: string;
    public Bank_Branch!: string;
    public ForeignBankInd!: Number;
    public Currency_Cd!: string;
    public Currency_Nm!: string;
    public BankAcc_Nm!: string;
    public ForeignBankStatus!: string;
    public Account_Type_New!: string;
}

export class PostPolicyNominee {
    public Actv_Ind!: number;
    public Flag!: string;
    public Id!: number;
    public Mode!: string;
    public PolicyNomineeObj!: Array<PolicyNomineeObj>;
    public Policy_Id!: number;
    public UID!: string;
    public Share!: string;
    public Mobile1!: number;
    public NomineeRelation_Cd!: string;
    public Dob!: Date;
    public Email1!: string;
    public Nominee_Cd!: number;
    public Minor_Ind!: number;
    public Nominee_Nm!: string;
    public PolicyInsured_Id!: string;
}

export class PolicyNomineeObj {
    public AppointeeRelation_Cd!: string;
    public Appointee_Address!: string;
    public Appointee_Cd!: string;
    public Appointee_Email!: string;
    public Appointee_Mobile!: string;
    public Appointee_Nm!: string;
    public Dob!: Date;
    public Email1!: string;
    public Minor_Ind!: number;
    public Mobile1!: number;
    public NomineeRelation_Cd!: string;
    public Nominee_Cd!: string;
    public Nominee_Nm!: string;
    public Percentage!: string;
    public PolicyInsured_Id!: string;
    public Share!: number;
}

export class PostClient {
    public Account_No!: number;
    public Actv_Ind!: number;
    public Address_Line1!: string;
    public Address_Line2!: string;
    public Address_Line3!: string;
    public AuthorizePersonOBJ!: string;
    public Bank_Nm!: string;
    public C_Type!: string;
    public Category!: string;
    public City_Nm!: string;
    public Client_Cd!: string;
    public ContactPerson_Email!: string;
    public ContactPerson_Nm!: string;
    public ContactPerson_No!: number;
    public Country!: string;
    public Designation!: string;
    public DirectorOBJ!: string;
    public District_Nm!: string;
    public Dob!: Date;
    public Email1!: string;
    public First_Nm!: string;
    public Flag!: string;
    public Full_Nm!: string;
    public Gender!: string;
    public ISD_Cd!: number;
    public IdType!: string;
    public Ifsc_Cd!: number;
    public Industry_Type!: string;
    public Mailing_Address1!: string;
    public Mailing_Address2!: string;
    public Mailing_Address3!: string;
    public Mailing_City!: string;
    public Mailing_Country!: string;
    public Mailing_District!: string;
    public Mailing_Pin_Zip!: number;
    public Mailing_State!: string;
    public Marital_Status!: string;
    public Mobile1!: string;
    public Mode!: string;
    public NRIC!: string;
    public Nationality!: string;
    public Occupation_Cd!: number;
    public Parent_Client_Cd!: string;
    public Pin_Zip!: number;
    public Registration_No!: number;
    public Same_As_Home!: number;
    public State_Nm!: string;
    public Type!: string;
    public UID!: string;
    public Yr_of_Estb!: Date;
    public cc_Mobile1!: number;
    public dAddress!: string;
    public dClient_Cd!: number;
    public dClient_Nm!: string;
    public dEmail!: string;
    public dMobile_No!: number;
    public dNRIC!: string;
    public dNationality!: string;
    public mailing_Mobile1!: number;
    public peP_Ind!: string;
}

export class GetClient {
    public Account_No!: string;
    public Account_Type!: string;
    public Actv_Ind!: number;
    public Address_Line1!: string;
    public Address_Line2!: string;
    public Address_Line3!: string;
    public Annual_Income!: string;
    public Area!: string;
    public BSB!: string;
    public Blood_Group!: string;
    public Bmi!: string;
    public C_Type!: string;
    public Category!: string;
    public City_Nm!: string;
    public Classification!: string;
    public Client_Cd!: string;
    public Company_Cd!: string;
    public Company_Type!: string;
    public ContactPerson_Email!: string;
    public ContactPerson_Nm!: string;
    public ContactPerson_No!: string;
    public Contact_Mobile_No!: string;
    public Contact_Person!: string;
    public Contact_Telephone_No!: string;
    public Country!: string;
    public DAddress!: string;
    public DClient_Cd!: string;
    public DClient_Nm!: string;
    public DCountry!: string;
    public DEmail!: string;
    public DMobile_No!: string;
    public DNRIC!: string;
    public DNationality!: string;
    public DPostCode!: string;
    public DState!: string;
    public Dcn_No!: string;
    public Designation!: string;
    public Designation_Cd!: string;
    public Diet!: string;
    public Disability_Details!: string;
    public District_Nm!: string;
    public Dob!: Date;
    public Earning_Ind!: string;
    public Eia_Account!: string;
    public Eia_Apply_Ind!: string;
    public Email1!: string;
    public Email2!: string;
    public Email3!: string;
    public Employee_Ind!: string;
    public Employee_No!: number;
    public Fax_No!: string;
    public First_Nm!: string;
    public Full_Nm!: string;
    public GSTIN!: string;
    public GSTIN_Type!: string;
    public Gender!: string;
    public Grade_Cd!: string;
    public Height!: number;
    public ISD_Cd!: string;
    public Id!: number;
    public IdType!: string;
    public Id_Proof!: string;
    public Id_Proof_No!: string;
    public Industry_Type!: string;
    public Initials_Nm!: string;
    public Injury_Details!: string;
    public Injury_Ind!: string;
    public Joining_Dt!: string;
    public Landline_No1!: string;
    public Landline_No2!: string;
    public Last_Nm!: string;
    public Location_Nm!: string;
    public Lst_Updt_Dt!: string;
    public Lst_Updt_Usr_Nm!: string;
    public Maiden_Nm!: string;
    public Mailing_Address1!: string;
    public Mailing_Address2!: string;
    public Mailing_Address3!: string;
    public Mailing_Area!: string;
    public Mailing_City!: string;
    public Mailing_Country!: string;
    public Mailing_District!: string;
    public Mailing_Fax_No!: string;
    public Mailing_Landline_No1!: string;
    public Mailing_Landline_No2!: string;
    public Mailing_Mobile1!: string;
    public Mailing_Mobile2!: string;
    public Mailing_Mobile3!: string;
    public Mailing_Pin_Zip!: string;
    public Mailing_State!: string;
    public Marital_Status!: string;
    public Member_Cd!: string;
    public Middle_Nm!: string;
    public Mobile1!: string;
    public Mobile2!: string;
    public Mobile3!: string;
    public Monthly_Income!: string;
    public NRIC!: string;
    public Nationality!: string;
    public Occupation_Cd!: string;
    public OfficeCity_Nm!: string;
    public Other_Nationality!: string;
    public Otp_Ind!: string;
    public PEP_Ind!: string;
    public Pan_No!: string;
    public Parent_Client_Cd!: string;
    public Parent_Client_Nm!: string;
    public Passport_No!: string;
    public Photo_Url!: string;
    public Pin_Zip!: string;
    public Political_Exposed_Details!: string;
    public Political_Exposed_Ind!: string;
    public Preexisting_Desc!: string;
    public Preexisting_Ind!: string;
    public Preferred_Payment_Mode_for_Claim!: string;
    public Qualification!: string;
    public RegisterCity_Nm!: string;
    public Registration_No!: string;
    public Remarks!: string;
    public Rural_Urban!: string;
    public Same_As_Home!: string;
    public State_Nm!: string;
    public Sync_Ind!: string;
    public Tan_No!: string;
    public Title!: string;
    public Type!: string;
    public UID!: string;
    public Weight!: number;
    public Yr_of_Estb!: string;
    public cc_Landline_No1!: string;
    public cc_Landline_No2!: string;
    public cc_Mailing_Landline_No1!: string;
    public cc_Mailing_Landline_No2!: string;
    public cc_Mailing_mobile1!: string;
    public cc_Mailing_mobile2!: string;
    public cc_Mobile1!: string;
    public cc_Mobile2!: string;
    public ClientBankObj!: Array<ClientBankObj>;
}

export class ClientBankObj {
    public Id!: Number;
    public Bank_Type!: string;
    public Client_Cd!: string;
    public Bank_Cd!: string;
    public Bank_Nm!: string;
    public Bank_Branch_Cd!: string;
    public Bank_Branch_Nm!: string;
    public Account_No!: string;
    public Swift_Cd!: string;
    public Ifsc_Cd!: string;
    public Micr_Cd!: string;
    public Start_Dt!: Date;
    public Default!: string;
    public End_Dt!: Date;
    public Crtd_Usr!: Number;
    public Crtd_Dt!: string;
    public Crtd_Ip_Addr!: string;
    public Actv_Ind!: Number;
    public Lst_Updt_Dt!: string;
    public Lst_Updt_Usr!: Number;
    public Lst_Updt_Ip_Addr!: string;
    public Bank_Branch!: string;
    public ForeignBankInd!: Number;
    public Currency_Cd!: string;
    public Currency_Nm!: string;
    public BankAcc_Nm!: string;
    public ForeignBankStatus!: string;
    public Account_Type_New!: string;
}
export class GetPolicyTrusty {
    public Actv_Ind!: number;
    public Crtd_Dt!: Date;
    public Crtd_Ip_Addr!: string;
    public Crtd_Usr!: number;
    public Email1!: string;
    public Id!: number;
    public Lst_Updt_Dt!: Date;
    public Lst_Updt_Ip_Addr!: string;
    public Lst_Updt_Usr!: number;
    public Mobile1!: string;
    public PolicyInsured_Id!: number;
    public Trusty_Cd!: number;
    public Policy_Id!: number;
    public Trusty_nm!: string;
    public UID!: string;
}

export class PostPolicyTrusty {
    public Mode!: string;
    public Policy_Id!: number;
    public Flag!: string;
    public Actv_Ind!: number;
    public PolicyTrustyObj!: Array<PolicyTrustyObj>;
}

export class PolicyTrustyObj {
    public PolicyInsured_Id!: number;
    public Trusty_nm!: string;
    public UID!: number;
    public Email1!: string;
    public Mobile1!: number;
    public Trusty_Cd!: number;
}

export class PostClientContact {
    public flag!: string;
    public client_Cd!: string;
    public mobile1!: string;
    public email1!: string;
    public address_Line1!: string;
    public pin_Zip!: string;
    public city_Nm!: string;
    public country!: string;
    public State_Nm!: string;
}

export class PostClientProfile {
    public flag!: string;
    public client_Cd!: string;
    public first_Nm!: string;
    public nric!: string;
    public dob!: string;
    public marital_Status!: string;
    public nationality!: string;
    public gender!: string;
}

export class GetCountry {
    public Id!: number;
    public Country_Cd!: string;
    public Country_Nm!: string;
    public ISD_Cd!: string;
    public Currency_Cd!: string;
    public Currency_Nm!: string;
    public Start_Dt!: string;
    public End_Dt!: string;
    public Actv_Ind!: number;
    public Lst_Updt_Dt!: string;
    public Lst_Updt_Usr!: string;
    public Lst_Updt_Ip_Addr!: string;
    public Lst_Updt_Usr_Nm!: string;
    public ISO_Cd!: string;
    public ISO_Cd_2!: string;
}

export class GetPinzip {
    public Id!: number;
    public Pin_Zip!: string;
    public Pin_Zip_Desc!: string;
    public Rural_Ind!: number;
    public City_Cd!: string;
    public City_Nm!: string;
    public District_Cd!: string;
    public District_Nm!: string;
    public State_Cd!: string;
    public State_Nm!: string;
    public Country_Cd!: string;
    public Country_Nm!: string;
    public Start_Dt!: Date;
    public End_Dt!: Date;
    public Lst_Updt_Dt!: string;
    public Actv_Ind!: string;
    public Lst_Updt_Usr_Nm!: string;
    public Lst_Updt_Ip_Addr!: string;
}

export class PostClientBank {
    public account_No!: string;
    public account_Type!: string;
    public actv_Ind!: Number;
    public bankAcc_Nm!: string;
    public bank_Branch_Cd!: string;
    public bank_Branch_Nm!: string;
    public bank_Cd!: string;
    public bank_Nm!: string;
    public bank_Type!: string;
    public bsb!: string;
    public client_Cd!: string;
    public crtd_Dt!: Date;
    public currency_Cd!: Number;
    public default!: string;
    public end_Dt!: Date;
    public flag!: string;
    public foreignBankInd!: string;
    public foreignBankStatus!: Number;
    public id!: Number;
    public ifsc_Cd!: string;
    public lst_Updt_Usr_Nm!: string;
    public micr_Cd!: string;
    public mode!: string;
    public pan_No!: Number;
    public start_Dt!: Date;
    public swift_Cd!: string;
}

export class GetBank {
    public Id!: number;
    public Bank_Nm!: string;
    public Bank_Cd!: string;
    public Bank_Type!: string;
    public Bank_Short_Nm!: string;
    public GL_Cd!: string;
    public Remarks!: string;
    public Lst_Updt_Dt!: string;
    public Lst_Updt_Usr_Nm!: string;
    public Actv_Ind!: number;
    public Default_Bank_Branch_Cd!: string;
    public Validlength!: string;
    public Validlength2!: string;
    public Validlength3!: string;
    public Validlength4!: string;
    public Validlength5!: string;
    public Validlength6!: string;
    public BNB_Cd!: string;
}

export class GetBankBranch {
    public Id!: number;
    public Bank_Nm!: string;
    public Bank_Cd!: string;
    public Bank_Branch_Nm!: string;
    public Bank_Branch_Cd!: string;
    public IFSC!: string;
    public MICR!: string;
    public Remarks!: string;
    public Lst_Updt_Dt!: string;
    public Lst_Updt_Usr_Nm!: string;
    public Actv_Ind!: number;
    public Swift_Cd!: string;
    public Bank_Type!: string;
}

export class GetProducts {
    public Accepted_Sum_Insured!: number;
    public Actv_Ind!: number;
    public Annualised_Excess_Premium!: string;
    public Annualised_Premium!: string;
    public Annualised_Premium_Discount!: string;
    public Base_Product_Cd!: number;
    public Contributry_Rate!: number;
    public Cover_Type!: string;
    public Covered_SI!: string;
    public Deductable!: string;
    public DelSI_Flag!: string;
    public Discount_Premium!: string;
    public Effective_From!: string;
    public Effective_Upto!: string;
    public Endorsement_Cd!: string;
    public Excess_Premium!: string;
    public Excess_SI!: string;
    public FCL_Base_Premium!: string;
    public FCL_Base_SumInsured!: number;
    public FamilyType_Cd!: number;
    public Flexi_Type!: string;
    public Full_Nm!: string;
    public GroupVersion_Id!: number;
    public HealthScreeningFee!: string;
    public Id!: number;
    public Inpatient_Facility!: string;
    public Lob_Cd!: string;
    public MCOFee!: string;
    public Mandatory_Base_Product!: string;
    public Member_Cd!: string;
    public Plan_No!: string;
    public Plan_Type!: string;
    public Plan_UW!: string;
    public PolicyGroup_Id!: number;
    public PolicyInsured_Id!: number;
    public PolicyRisk_Id!: number;
    public PolicyStatus_Cd!: string;
    public PolicyVersion_Id!: number;
    public Policy_Id!: number;
    public Postpone_Dt!: string;
    public Premium!: number;
    public Premium_Calc_Ind!: number;
    public Premium_Calc_Ind1!: number;
    public Previous_FCL!: string;
    public ProductSchema_Cd!: string;
    public Product_Cd!: number;
    public Product_Cd_C!: string;
    public Product_Nm!: string;
    public Product_Nm_C!: string;
    public Proposal_Type!: string;
    public RI_Ind!: number;
    public Relation_Category!: string;
    public Relation_Cd!: string;
    public Relation_Id!: number;
    public Relation_Nm!: string;
    public Relation_Nm1!: string;
    public Remarks!: string;
    public RiderPolicyGroup_Id!: string;
    public SI_Type!: string;
    public Scheme_Cd!: number;
    public Scheme_Nm!: string;
    public Status_Cd!: string;
    public Status_Nm!: string;
    public Sum_Insured!: number;
    public Sum_Insured_Basis!: string;
    public TPA_Cd!: string;
    public Takeover_SI!: string;
    public Tax_Amt!: number;
    public Tax_Rate!: number;
    public Total_Accepted_SI!: number;
    public Total_SI!: number;
    public Type!: string;
    public UW_Decision_Dt!: Date;
    public WellnessFee!: string;

}