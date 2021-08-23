/**
* External dependencies
*/
import React from 'react'
import { InputLeftAddon, InputRightAddon, Button, FormControl, FormHelperText, FormLabel, Input, Select, Stack, Textarea, VStack, InputGroup, } from '@chakra-ui/react'
import { v4 as uuidv4 } from "uuid"
/**
* Internal dependencies
*/
import { FieldGroup } from './FieldGroup'
// import DatePicker from '../../DatePicker'
import { useSubmitJobPost } from '../../../hooks'
import { DangerZone } from './DangerZone'
import { useAuth } from '../../../hooks'
import { MySpinner } from '../../waiting/MySpinner'
import { AdminBlob } from '../../AdminBlob'


export const JobPostForm = (props) => {

  const { formType, formDeets, setFormDeets, setFormLoading } = props
  const { title, salary, content, companyBio, closeDate, jobLocation, sector, jobType, companyName, id } = props

  const { submitJobPost, submitLoading } = useSubmitJobPost(formType);

  const { viewer, loadingViewer } = useAuth()

  function handleSubmit(e) {
    e.preventDefault();
    submitJobPost({
      variables: { clientMutationId: uuidv4(), ...formDeets }
    })
      // .then(navigate(`/maker/jobs`))
      .catch(error => {
        console.log(error); //fix
      });
  }

  if (loadingViewer || !viewer) {
    return <MySpinner />
  }

  return (
    <>

      {/* <pre>{JSON.stringify( formDeets , null, 2)}</pre> */}

      <form
        id="settings-form"
        onSubmit={handleSubmit}
      >
        <Stack spacing="6" justify="center" align="center">

          <AdminBlob title="Job Information">

            <VStack width="full" spacing="6">

              <FormControl>
                <FormLabel htmlFor="jobTitleSelect">Job Title</FormLabel>
                <Input
                  id="jobTitleSelect"
                  type="text"
                  value={title}
                  onChange={e =>
                    setFormDeets({
                      ...formDeets,
                      title: e.target.value,
                    })
                  }
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel htmlFor="jobLocationSelect">Location</FormLabel>
                <Select
                  id="jobLocationSelect"
                  placeholder="Select Location"
                  value={jobLocation}
                  onChange={e =>
                    setFormDeets({
                      ...formDeets,
                      jobLocation: e.target.value,
                    })
                  }
                >
                  <option value="East London">East London</option>
                  <option value="North London">North London</option>
                  <option value="South London">South London</option>
                  <option value="West London">West London</option>
                  <option value="Remote">Remote</option>
                </Select>
              </FormControl>

              <FormControl isRequired>
                <FormLabel htmlFor="jobTypeSelect">Contract Type</FormLabel>
                <Select
                  isRequired
                  id="jobTypeSelect"
                  placeholder="Select Job Type"
                  value={jobType}
                  onChange={e =>
                    setFormDeets({
                      ...formDeets,
                      jobType: e.target.value,
                    })
                  }
                >
                  <option value="Internship">Internship</option>
                  <option value="Graduate Job">Graduate Job</option>
                  <option value="Work Experience">Work Experience</option>
                  <option value="Full Time">Full Time</option>
                  <option value="Part Time">Part Time</option>
                </Select>
              </FormControl>

              <FormControl>
                <FormLabel htmlFor="jobSalarySelect">Salary</FormLabel>
                <InputGroup>
                  <InputLeftAddon children="£" />
                  <Input
                    id="jobSalarySelect"
                    type="text"
                    value={salary}
                    onChange={e =>
                      setFormDeets({
                        ...formDeets,
                        salary: e.target.value,
                      })
                    }
                  />
                  <InputRightAddon children="/yr" />
                </InputGroup>
              </FormControl>


              <FormControl isRequired>
                <FormLabel htmlFor="closeDateInput">Close Date</FormLabel>
                <Input
                  value={closeDate}
                  onChange={e =>
                    setFormDeets({
                      ...formDeets,
                      closeDate: e.target.value,
                    })
                  }
                />
              </FormControl>
              {/* <FormControl isRequired>
                <FormLabel htmlFor="closeDateInput">Close Date</FormLabel>
                <DatePicker 
                  selected={closeDate} 
                  isClearable={true} 
                  value={closeDate}
                  onChange={e =>
                    setFormDeets({
                      ...formDeets,
                      closeDate: e.target.value,
                    })
                  }
                />
              </FormControl> */}

            </VStack>
          </AdminBlob>

          <AdminBlob title="Company Info">

            <VStack width="full" spacing="6">

              <FormControl isRequired>
                <FormLabel htmlFor="jobSalarySelect">Organisation Name</FormLabel>
                <Input
                  id="jobSalarySelect"
                  type="text"
                  value={companyName}
                  onChange={e =>
                    setFormDeets({
                      ...formDeets,
                      companyName: e.target.value,
                    })
                  }
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel htmlFor="jobSectorSelect">Organisation Sector</FormLabel>
                <Select
                  isRequired
                  id="jobSectorSelect"
                  placeholder="Select Sector"
                  value={sector}
                  onChange={e =>
                    setFormDeets({
                      ...formDeets,
                      sector: e.target.value,
                    })
                  }
                >
                  <option value="Tech">Tech</option>
                  <option value="Sport">Sport</option>
                  <option value="Publishing">Publishing</option>
                </Select>
              </FormControl>

              <FormControl isRequired>
                <FormLabel htmlFor="jobContentSelect">Organisation Bio</FormLabel>
                <Textarea
                  htmlFor="jobContentSelect"
                  rows={5}
                  value={companyBio}
                  onChange={e =>
                    setFormDeets({
                      ...formDeets,
                      companyBio: e.target.value,
                    })
                  }
                >
                  {formDeets.companyBio}
                </Textarea>
                <FormHelperText>
                  Brief description for your organisation's account.
                </FormHelperText>
              </FormControl>

              {/* <Stack direction="row" spacing="6" align="center" width="full">
                <Avatar
                  size="xl"
                  name="Alyssa Mall"
                  src="https://images.unsplash.com/photo-1488282396544-0212eea56a21?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
                />
                <Box>
                  <HStack spacing="5">
                    <Button leftIcon={<HiCloudUpload />}>Change logo</Button>
                    <Button variant="ghost" colorScheme="red">
                      Delete
                    </Button>
                  </HStack>
                  <Text fontSize="sm" mt="3">
                    .jpg, .gif, or .png. Max file size 700K.
                  </Text>
                </Box>
              </Stack> */}

            </VStack>
          </AdminBlob>

          <AdminBlob title="Job Description">
            <FormControl >
              <Textarea
                id="jobDescription Input"
                type="text"
                rows={5}
                value={content}
                onChange={e =>
                  setFormDeets({
                    ...formDeets,
                    content: e.target.value,
                  })
                }
              >
                {formDeets.content}
              </Textarea>
              <FormHelperText>
                Brief description for your organisation's account.
              </FormHelperText>
            </FormControl>
          </AdminBlob>

          {
            formType === 'update' && (
              <FieldGroup>
                <DangerZone jobPostId={id} />
              </FieldGroup>
            )
          }


          {/* <FieldGroup title="Notifications">
            <Stack width="full" spacing="4">
              <Checkbox>Get updates about the latest meetups.</Checkbox>
              <Checkbox>Get notifications about your account activities</Checkbox>
            </Stack>
          </FieldGroup>
          <FieldGroup title="Connect accounts">
            <HStack width="full">
              <Button variant="outline" leftIcon={<FaGithub />}>
                Delete Account
              </Button>
            </HStack>
          </FieldGroup> */}

          <Button
            isLoading={submitLoading}
            loadingText="Submitting"
            alignSelf="flex-end"
            type="submit"
            colorScheme={!submitLoading ? "green" : "blue"}
            disabled={submitLoading}
          >
            {"Submit Job"}
          </Button >
        </Stack>


      </form>
    </>
  )
}