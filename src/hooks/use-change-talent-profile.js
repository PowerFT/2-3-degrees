/**
 * External dependencies
 */
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
// import { decodeEntities } from '@wordpress/html-entities';
// import { stripHtml } from 'string-strip-html';

/**
 * Internal dependencies
 */
import { useChangeTalentProfileMutation } from './mutations/use-change-talent-profile-mutation';

// const errorCodes = {
// 	invalid_username:
// 		'Invalid username or email address. Please check it and try again.',
// 	invalid_email: 'Invalid email address. Please check it and try again.',
// 	incorrect_password:
// 		'Incorrect password. Please try again, or reset your password.',
// 	empty_username: 'Please provide your username.',
// 	empty_password: 'Please provide your password.',
// };

export const useChangeTalentProfile = () => {
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('idle');

  const { mutation: changeTalentProfileMutation, mutationResults } =
    useChangeTalentProfileMutation();

  const changeTalentProfile = (talentDeets) => {
    setError(null);
    setStatus('resolving');

    const success = (result) => {
      console.log(result);
      setStatus('resolved');
      return result.data;
    };

    const fail = (errors) => {
      console.log(errors);
      setStatus('resolved');
      setError(errors);
    };

    return changeTalentProfileMutation({
      variables: {
        clientMutationId: uuidv4(),
        profileId: parseInt(talentDeets.profileId),
        alevels_end_date: talentDeets?.alevels?.alevelsEndDate,
        alevels_institution: talentDeets?.alevels?.alevelsInstitution,
        alevels_subjects: talentDeets?.alevels?.alevelsSubjects,
        dob: talentDeets?.dob,
        email: talentDeets?.email,
        first_name: talentDeets?.firstName,
        gcse_end_date: talentDeets?.gcse?.gcseEndDate,
        gcse_institution: talentDeets?.gcse?.gcseInstitution,
        gcse_subjects: talentDeets?.gcse?.gcseSubjects,
        last_name: talentDeets?.lastName,
        masters_end_date: talentDeets?.masters?.mastersEndDate,
        masters_institution: talentDeets?.masters?.mastersInstitution,
        masters_subjects: talentDeets?.masters?.mastersSubjects,
        postcode: talentDeets?.postcode,
        undergraduate_end_date:
          talentDeets?.undergraduate?.undergraduateEndDate,
        undergraduate_institution:
          talentDeets?.undergraduate?.undergraduateInstitution,
        undergraduate_subjects:
          talentDeets?.undergraduate?.undergraduateSubjects,
        btec_end_date: talentDeets?.btec?.btecEndDate,
        btec_institution: talentDeets?.btec?.btecInstitution,
        btec_subjects: talentDeets?.btec?.btecSubjects,
        vocational_end_date: talentDeets?.vocational?.vocationalEndDate,
        vocational_institution: talentDeets?.vocational?.vocationalInstitution,
        vocational_subjects: talentDeets?.vocational?.vocationalSubjects,
        tlevel_end_date: talentDeets?.tlevel?.tlevelEndDate,
        tlevel_institution: talentDeets?.tlevel?.tlevelInstitution,
        tlevel_subjects: talentDeets?.tlevel?.tlevelSubjects,
        we1_company: talentDeets?.workExperienceOne?.we1Company,
        we1_end: talentDeets?.workExperienceOne?.we1End,
        we1_role: talentDeets?.workExperienceOne?.we1Role,
        we1_start: talentDeets?.workExperienceOne?.we1Start,
        we2_company: talentDeets?.workExperienceTwo?.we2Company,
        we2_end: talentDeets?.workExperienceTwo?.we2End,
        we2_role: talentDeets?.workExperienceTwo?.we2Role,
        we2_start: talentDeets?.workExperienceTwo?.we2Start,
        we3_company: talentDeets?.workExperienceThree?.we3Company,
        we3_end: talentDeets?.workExperienceThree?.we3End,
        we3_role: talentDeets?.workExperienceThree?.we3Role,
        we3_start: talentDeets?.workExperienceThree?.we3Start,
        // we4_company: talentDeets?.workExperienceFour?.we4Company,
        // we4_end: talentDeets?.workExperienceFour?.we4End,
        // we4_role: talentDeets?.workExperienceFour?.we4Role,
        // we4_start: talentDeets?.workExperienceFour?.we4Start,
        // we5_company: talentDeets?.workExperienceFive?.we5Company,
        // we5_end: talentDeets?.workExperienceFive?.we5End,
        // we5_role: talentDeets?.workExperienceFive?.we5Role,
        // we5_start: talentDeets?.workExperienceFive?.we5Start,
      },
    })
      .then(success)
      .catch(fail);
  };

  return {
    changeTalentProfile,
    error,
    status,
  };
};
