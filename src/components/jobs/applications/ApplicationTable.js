import React from 'react';
import { Table, Thead, Tr, Th, Td, Tbody, Box } from '@chakra-ui/react';

export const ApplicationTable = ({ tp, q, ...rest }) => {
  console.log(q);
  return (
    <Box {...rest} padding="4">
      <Table size="sm" maxW="2xl" bg="gray.50">
        <Thead>
          <Tr>
            <Th fontSize="lg" py="2">
              Basic
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td>First Name</Td>
            <Td>{tp?.firstName}</Td>
          </Tr>
          <Tr>
            <Td>Last Name</Td>
            <Td>{tp?.lastName}</Td>
          </Tr>
          <Tr>
            <Td>Email</Td>
            <Td>{tp?.email}</Td>
          </Tr>
        </Tbody>
      </Table>

      <Table size="sm" maxW="2xl" bg="gray.50" borderColor="gray.900">
        <Thead>
          <Tr>
            <Th fontSize="lg" py="2">
              Questions / Answers
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {q.answer1 && (
            <Tr>
              <Td>Tell us why you would be great for this opportunity?</Td>
              <Td>{q.answer1}</Td>
            </Tr>
          )}
          {q.answer2 && (
            <Tr>
              <Td>
                Tell us about one of your key skills and how it is relevant to
                this opportunity?
              </Td>
              <Td>{q.answer2}</Td>
            </Tr>
          )}
          {q.answer3 && (
            <Tr>
              <Td>
                Tell us how this opportunity will contribute to your future
                plans?
              </Td>
              <Td>{q.answer3}</Td>
            </Tr>
          )}
          {q.answer4 && (
            <Tr>
              <Td>
                What experience do you have that is relevant to this
                opportunity?
              </Td>
              <Td>{q.answer4}</Td>
            </Tr>
          )}
        </Tbody>
      </Table>

      <Table size="sm" maxW="2xl" bg="gray.50">
        <Thead>
          <Tr>
            <Th fontSize="lg" py="2">
              Work Experiences
            </Th>
          </Tr>
        </Thead>
        {tp?.workExperienceOne?.we1Company &&
          tp?.workExperienceOne?.we1Role &&
          tp?.workExperienceOne?.we1Start &&
          tp?.workExperienceOne?.we1End && (
            <>
              <Thead>
                <Tr>
                  <Th>Work Experience</Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td>Company</Td>
                  <Td>{tp?.workExperienceOne?.we1Company}</Td>
                </Tr>
                <Tr>
                  <Td>Role</Td>
                  <Td>{tp?.workExperienceOne?.we1Role}</Td>
                </Tr>
                <Tr>
                  <Td>Start Date</Td>
                  <Td>{tp?.workExperienceOne?.we1Start}</Td>
                </Tr>
                <Tr>
                  <Td>End Date</Td>
                  <Td>{tp?.workExperienceOne?.we1End}</Td>
                </Tr>
              </Tbody>
            </>
          )}

        {tp?.workExperienceTwo?.we2Company &&
          tp?.workExperienceTwo?.we2Role &&
          tp?.workExperienceTwo?.we2Start &&
          tp?.workExperienceTwo?.we2End && (
            <>
              <Thead>
                <Tr>
                  <Td></Td>
                </Tr>
                <Tr>
                  <Th>Work Experience</Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td>Company</Td>
                  <Td>{tp?.workExperienceTwo?.we2Company}</Td>
                </Tr>
                <Tr>
                  <Td>Role</Td>
                  <Td>{tp?.workExperienceTwo?.we2Role}</Td>
                </Tr>
                <Tr>
                  <Td>Start Date</Td>
                  <Td>{tp?.workExperienceTwo?.we2Start}</Td>
                </Tr>
                <Tr>
                  <Td>End Date</Td>
                  <Td>{tp?.workExperienceTwo?.we2End}</Td>
                </Tr>
              </Tbody>
            </>
          )}

        {tp?.workExperienceThree?.we3Company &&
          tp?.workExperienceThree?.we3Role &&
          tp?.workExperienceThree?.we3Start &&
          tp?.workExperienceThree?.we3End && (
            <>
              <Thead>
                <Tr>
                  <Td></Td>
                </Tr>
                <Tr>
                  <Th>Work Experience</Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td>Company</Td>
                  <Td>{tp?.workExperienceThree?.we3Company}</Td>
                </Tr>
                <Tr>
                  <Td>Role</Td>
                  <Td>{tp?.workExperienceThree?.we3Role}</Td>
                </Tr>
                <Tr>
                  <Td>Start Date</Td>
                  <Td>{tp?.workExperienceThree?.we3Start}</Td>
                </Tr>
                <Tr>
                  <Td>End Date</Td>
                  <Td>{tp?.workExperienceThree?.we3End}</Td>
                </Tr>
              </Tbody>
            </>
          )}
      </Table>

      <Table size="sm" maxW="2xl" bg="gray.50">
        <Thead>
          <Tr>
            <Th fontSize="lg" py="2">
              Education
            </Th>
          </Tr>
        </Thead>
        {tp?.gcse?.gcseInstitution &&
          tp?.gcse?.gcseSubjects &&
          tp?.gcse?.gcseGrades &&
          tp?.gcse?.gcseEndDate && (
            <>
              <Thead>
                <Tr>
                  <Th>GCSE</Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td>Institution</Td>
                  <Td>{tp?.gcse?.gcseInstitution}</Td>
                </Tr>
                <Tr>
                  <Td>Subjects</Td>
                  <Td>{tp?.gcse?.gcseSubjects}</Td>
                </Tr>
                <Tr>
                  <Td>Grades</Td>
                  <Td>{tp?.gcse?.gcseGrades}</Td>
                </Tr>
                <Tr>
                  <Td>End Date</Td>
                  <Td>{tp?.gcse?.gcseEndDate}</Td>
                </Tr>
              </Tbody>
            </>
          )}
        {tp?.alevels?.alevelsInstitution &&
          tp?.alevels?.alevelsSubjects &&
          tp?.alevels?.alevelsGrades &&
          tp?.alevels?.alevelsEndDate && (
            <>
              <Thead>
                {tp?.gcse?.gcseInstitution &&
                  tp?.gcse?.gcseSubjects &&
                  tp?.gcse?.gcseGrades &&
                  tp?.gcse?.gcseEndDate && (
                    <Tr>
                      <Td></Td>
                    </Tr>
                  )}
                <Tr>
                  <Th>A-levels</Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td>Institution</Td>
                  <Td>{tp?.alevels?.alevelsInstitution}</Td>
                </Tr>
                <Tr>
                  <Td>Subjects</Td>
                  <Td>{tp?.alevels?.alevelsSubjects}</Td>
                </Tr>
                <Tr>
                  <Td>Grades</Td>
                  <Td>{tp?.alevels?.alevelsGrades}</Td>
                </Tr>
                <Tr>
                  <Td>End Date</Td>
                  <Td>{tp?.alevels?.alevelsEndDate}</Td>
                </Tr>
              </Tbody>
            </>
          )}

        {tp?.alevels?.alevelsInstitution &&
          tp?.alevels?.alevelsSubjects &&
          tp?.alevels?.alevelsGrades &&
          tp?.alevels?.alevelsEndDate && (
            <>
              <Thead>
                {tp?.alevels?.alevelsInstitution &&
                  tp?.alevels?.alevelsSubjects &&
                  tp?.alevels?.alevelsGrades &&
                  tp?.alevels?.alevelsEndDate && (
                    <Tr>
                      <Td></Td>
                    </Tr>
                  )}
                <Tr>
                  <Th>Undergraduate Degree</Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td>Institution</Td>
                  <Td>{tp?.undergraduate?.undergraduateInstitution}</Td>
                </Tr>
                <Tr>
                  <Td>Subjects</Td>
                  <Td>{tp?.undergraduate?.undergraduateSubjects}</Td>
                </Tr>
                <Tr>
                  <Td>Grades</Td>
                  <Td>{tp?.undergraduate?.undergraduateGrades}</Td>
                </Tr>
                <Tr>
                  <Td>End Date</Td>
                  <Td>{tp?.undergraduate?.undergraduateEndDate}</Td>
                </Tr>
              </Tbody>
            </>
          )}

        {tp?.alevels?.alevelsInstitution &&
          tp?.alevels?.alevelsSubjects &&
          tp?.alevels?.alevelsGrades &&
          tp?.alevels?.alevelsEndDate && (
            <>
              <Thead>
                {tp?.alevels?.alevelsInstitution &&
                  tp?.alevels?.alevelsSubjects &&
                  tp?.alevels?.alevelsGrades &&
                  tp?.alevels?.alevelsEndDate && (
                    <Tr>
                      <Td></Td>
                    </Tr>
                  )}
                <Tr>
                  <Th>Masters Degree</Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td>Institution</Td>
                  <Td>{tp?.masters.mastersInstitution}</Td>
                </Tr>
                <Tr>
                  <Td>Subjects</Td>
                  <Td>{tp?.masters.mastersSubjects}</Td>
                </Tr>
                <Tr>
                  <Td>Grades</Td>
                  <Td>{tp?.masters.mastersGrades}</Td>
                </Tr>
                <Tr>
                  <Td>End Date</Td>
                  <Td>{tp?.masters.mastersEndDate}</Td>
                </Tr>
              </Tbody>
            </>
          )}
      </Table>
    </Box>
  );
};
