import { useState } from 'react'
import { Box, Form, FormField, TextInput, TextArea } from 'grommet';
import styled from 'styled-components'
import Select from 'react-select'
import { Checkmark } from 'grommet-icons';
const SelectStyle = styled(Select)`
  width: 150px;
`
const TextInputStyle = styled(TextInput)`
  background-color : white;
`

const Add = () => {
  const [twitter, setTwitter] = useState('@')
  return (
    <>
      <Checkmark style={{ position: 'fixed', right: 10, top: 10 }} color={'white'} />
      <Box margin={{ horizontal: 'large', vertical: 'small' }}>
        <Form>
          <FormField name="value" label="ชื่อสินค้า" required >
            <TextArea name="value" placeholder="ชื่อ - รายละเอียดสินค้า" resize={false} style={{ backgroundColor: 'white' }} />
          </FormField>
          <Box direction="row" gap="medium" >
            <FormField name="value" label="Twitter" required >
              <TextInputStyle name="value" placeholder="Account Twitter ขึ้นต้นด้วย @"
                value={twitter} onChange={(e) => setTwitter(e.target.value)} style={{ width: 150 }} />
            </FormField>
            <FormField name="value" label="การจ่าย" required >
              <SelectStyle
                options={[
                  { value: 'มัดจำ', label: 'มัดจำ' },
                  { value: 'จ่ายแล้ว', label: 'จ่ายแล้ว' },
                  { value: 'ยังไม่จ่าย', label: 'ยังไม่จ่าย' },
                ]} />
            </FormField>
          </Box>
          <Box direction="row" gap="medium" >
            <FormField name="value" label="ยอดโอน" required style={{ width: 100 }} >
              <TextInputStyle name="value" placeholder="ราคา" type="number" />
            </FormField>
            <FormField name="value" label="จำนวน" required style={{ width: 100 }} >
              <TextInputStyle name="value" placeholder="จำนวน" type="number" />
            </FormField>
            <FormField name="value" label="ค่าส่ง" required style={{ width: 100 }} >
              <TextInputStyle name="value" placeholder="ค่าส่ง" type="number" />
            </FormField>
          </Box>
          <Box direction="row" gap="medium" >
            <FormField name="value" label="การจัดส่ง" required style={{ width: 150 }} >
              <SelectStyle
                options={[
                  { value: 'ลงทะเบียน', label: 'ลงทะเบียน' },
                  { value: 'EMS', label: 'EMS' },
                ]} />
            </FormField>
            <FormField name="value" label="โน๊ต" required style={{ width: 150 }} >
              <TextInputStyle name="value" placeholder="โน๊ต" />
            </FormField>
          </Box>
          <FormField name="value" label="ที่อยู่" required >
            <TextArea name="value" placeholder="ที่อยู่" resize={false} style={{ backgroundColor: 'white' }} />
          </FormField>
          <hr style={{ marginTop: 10, border: '1px solid white' }}></hr>
        </Form>
        <Box direction="row" gap="medium" >
          <FormField name="value" label="ต้นทุน" required style={{ width: 150 }} >
            <TextInputStyle name="value" placeholder="enter 0 for optional" />
          </FormField>
          <FormField name="value" label="ขายจริง" required style={{ width: 150 }} >
            <TextInputStyle name="value" placeholder="enter 0 for optional" />
          </FormField>
        </Box>
      </Box>
    </>
  )
}

export default Add