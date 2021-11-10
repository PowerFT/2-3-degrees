/**
 * External dependencies
 */
import { gql, useQuery } from '@apollo/client';

const TALENT_VIEWER = gql`
  query MyQuery {
    viewer {
      talentProfiles {
        nodes {
          id
          databaseId
          talentProfile {
            firstName
            lastName
            dob
            postcode
            email
            gcse {
              gcseInstitution
              gcseSubjects
              gcseEndDate
            }
            alevels {
              alevelsInstitution
              alevelsSubjects
              alevelsEndDate
            }
            undergraduate {
              undergraduateInstitution
              undergraduateSubjects
              undergraduateEndDate
            }
            masters {
              mastersInstitution
              mastersSubjects
              mastersEndDate
            }
            btec {
              btecInstitution
              btecSubjects
              btecEndDate
            }
            vocational {
              vocationalInstitution
              vocationalSubjects
              vocationalEndDate
            }
            tlevel {
              tlevelInstitution
              tlevelSubjects
              tlevelEndDate
            }
            workExperienceOne {
              we1Company
              we1Role
              we1Start
              we1End
            }
            workExperienceTwo {
              we2Company
              we2Role
              we2Start
              we2End
            }
            workExperienceThree {
              we3Company
              we3Role
              we3Start
              we3End
            }
            workExperienceFour {
              we4Company
              we4Role
              we4Start
              we4End
            }
            workExperienceFive {
              we5Company
              we5Role
              we5Start
              we5End
            }
          }
        }
      }
    }
  }
`;

/**
 * Hook which gets details about the logged in user.
 */
export const useTalentViewerQuery = () => {
  const { loading, error, data, refetch } = useQuery(TALENT_VIEWER);

  return {
    loading,
    error,
    data: data ? data : null,
    refetch,
  };
};
