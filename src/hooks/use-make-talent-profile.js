/**
 * External dependencies
 */
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

/**
 * Internal dependencies
 */
import { useMakeTalentProfileMutation } from './mutations/use-make-talent-profile-mutation';

export const useMakeTalentProfile = () => {
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('idle');

  const { mutation: makeTalentProfileMutation, mutationResults } =
    useMakeTalentProfileMutation();

  const makeTalentProfile = (talentDeets) => {
    setError(null);

    const success = (result) => {
      setStatus('resolving');
      return result.data;
    };

    const fail = (errors) => {
      setStatus('resolved');
      setError(errors);
    };

    return makeTalentProfileMutation({
      variables: {
        clientMutationId: uuidv4(),
        alevels_end_date: talentDeets?.alevels?.alevelsEndDate,
        alevels_institution: talentDeets?.alevels?.alevelsInstitution,
        alevels_subjects: talentDeets?.alevels?.alevelsSubjects,
        dob: talentDeets?.dob,
        first_name: talentDeets?.firstName,
        gcse_end_date: talentDeets?.gcse?.gcseEndDate,
        gcse_institution: talentDeets?.gcse?.gcseInstitution,
        gcse_subjects: talentDeets?.gcse?.gcseSubjects,
        last_name: talentDeets?.lastName,
        masters_end_date: talentDeets?.masters?.mastersEndDate,
        masters_institution: talentDeets?.masters?.mastersInstitution,
        masters_subjects: talentDeets?.masters?.mastersSubjects,
        btec_end_date: talentDeets?.btec?.btecEndDate,
        btec_institution: talentDeets?.btec?.btecInstitution,
        btec_subjects: talentDeets?.btec?.btecSubjects,
        vocational_end_date: talentDeets?.vocational?.vocationalEndDate,
        vocational_institution: talentDeets?.vocational?.vocationalInstitution,
        vocational_subjects: talentDeets?.vocational?.vocationalSubjects,
        tlevel_end_date: talentDeets?.tlevel?.tlevelEndDate,
        tlevel_institution: talentDeets?.tlevel?.tlevelInstitution,
        tlevel_subjects: talentDeets?.tlevel?.tlevelSubjects,
        postcode: talentDeets?.postcode,
        undergraduate_end_date:
          talentDeets?.undergraduate?.undergraduateEndDate,
        undergraduate_institution:
          talentDeets?.undergraduate?.undergraduateInstitution,
        undergraduate_subjects:
          talentDeets?.undergraduate?.undergraduateSubjects,
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
        we4_company: talentDeets?.workExperienceFour?.we4Company,
        we4_end: talentDeets?.workExperienceFour?.we4End,
        we4_role: talentDeets?.workExperienceFour?.we4Role,
        we4_start: talentDeets?.workExperienceFour?.we4Start,
        we5_company: talentDeets?.workExperienceFive?.we5Company,
        we5_end: talentDeets?.workExperienceFive?.we5End,
        we5_role: talentDeets?.workExperienceFive?.we5Role,
        we5_start: talentDeets?.workExperienceFive?.we5Start,
      },
    })
      .then(success)
      .catch(fail);
  };

  return {
    makeTalentProfile,
    error,
    status,
  };
};
