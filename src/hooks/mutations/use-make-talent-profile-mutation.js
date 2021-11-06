/**
 * External dependencies
 */
import { gql, useMutation } from '@apollo/client';

const MAKE_TALENT_PROFILE = gql`
  mutation makeTalentProfile(
    $clientMutationId: String
    $alevels_end_date: String
    $alevels_institution: String
    $alevels_subjects: String
    $dob: String
    $first_name: String
    $gcse_end_date: String
    $gcse_institution: String
    $gcse_subjects: String
    $last_name: String
    $masters_end_date: String
    $masters_institution: String
    $masters_subjects: String
    $postcode: String
    $undergraduate_end_date: String
    $undergraduate_institution: String
    $undergraduate_subjects: String
    $btec_end_date: String
    $btec_institution: String
    $btec_subjects: String
    $vocational_end_date: String
    $vocational_institution: String
    $vocational_subjects: String
    $tlevel_end_date: String
    $tlevel_institution: String
    $tlevel_subjects: String
    $we1_company: String
    $we1_end: String
    $we1_role: String
    $we1_start: String
    $we2_company: String
    $we2_end: String
    $we2_role: String
    $we2_start: String
    $we3_company: String
    $we3_end: String
    $we3_role: String
    $we3_start: String
    $we4_company: String
    $we4_end: String
    $we4_role: String
    $we4_start: String
    $we5_company: String
    $we5_end: String
    $we5_role: String
    $we5_start: String
  ) {
    makeTalentProfile(
      input: {
        clientMutationId: $clientMutationId
        alevels_end_date: $alevels_end_date
        alevels_institution: $alevels_institution
        alevels_subjects: $alevels_subjects
        dob: $dob
        first_name: $first_name
        gcse_end_date: $gcse_end_date
        gcse_institution: $gcse_institution
        gcse_subjects: $gcse_subjects
        last_name: $last_name
        masters_end_date: $masters_end_date
        masters_institution: $masters_institution
        masters_subjects: $masters_subjects
        postcode: $postcode
        undergraduate_end_date: $undergraduate_end_date
        undergraduate_institution: $undergraduate_institution
        undergraduate_subjects: $undergraduate_subjects
        btec_end_date: $btec_end_date
        btec_institution: $btec_institution
        btec_subjects: $btec_subjects
        vocational_end_date: $vocational_end_date
        vocational_institution: $vocational_institution
        vocational_subjects: $vocational_subjects
        tlevel_end_date: $tlevel_end_date
        tlevel_institution: $tlevel_institution
        tlevel_subjects: $tlevel_subjects
        we1_company: $we1_company
        we1_end: $we1_end
        we1_role: $we1_role
        we1_start: $we1_start
        we2_company: $we2_company
        we2_end: $we2_end
        we2_role: $we2_role
        we2_start: $we2_start
        we3_company: $we3_company
        we3_end: $we3_end
        we3_role: $we3_role
        we3_start: $we3_start
        we4_company: $we4_company
        we4_end: $we4_end
        we4_role: $we4_role
        we4_start: $we4_start
        we5_company: $we5_company
        we5_end: $we5_end
        we5_role: $we5_role
        we5_start: $we5_start
      }
    ) {
      data
      success
    }
  }
`;

export const useMakeTalentProfileMutation = () => {
  const [mutation, mutationResults] = useMutation(MAKE_TALENT_PROFILE);
  return { mutation, results: mutationResults };
};
