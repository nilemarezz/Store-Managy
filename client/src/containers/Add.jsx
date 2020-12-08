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
  color : black;
`
const Label = styled(FormField)`
  ::label{
    color : white;
  }
`

const Add = () => {
  const [twitter, setTwitter] = useState('@')
  return (
    <>
      <Checkmark style={{ position: 'fixed', right: 10, top: 10 }} color={'white'} />
      <Box margin={{ horizontal: 'large', vertical: 'small' }} >
        <Form>
          <Label name="value" label="ชื่อสินค้า" required style={{ color: 'white' }}>
            <TextArea name="value" placeholder="ชื่อ - รายละเอียดสินค้า" resize={false} style={{ backgroundColor: 'white', color: 'black' }} />
          </Label>
          <Box direction="row" gap="medium" >
            <FormField name="value" label="Twitter" required style={{ color: 'white' }}>
              <TextInputStyle name="value" placeholder="Account Twitter ขึ้นต้นด้วย @"
                value={twitter} onChange={(e) => setTwitter(e.target.value)} style={{ width: 150 }} />
            </FormField>
            <FormField name="value" label="การจ่าย" required style={{ color: 'white' }}>
              <SelectStyle
                style={{ color: 'black' }}
                options={[
                  { value: 'มัดจำ', label: 'มัดจำ' },
                  { value: 'จ่ายแล้ว', label: 'จ่ายแล้ว' },
                  { value: 'ยังไม่จ่าย', label: 'ยังไม่จ่าย' },
                ]} />
            </FormField>
          </Box>
          <Box direction="row" gap="medium" >
            <FormField name="value" label="ยอดโอน" required style={{ width: 100 }} style={{ color: 'white' }}>
              <TextInputStyle name="value" placeholder="ราคา" type="number" />
            </FormField>
            <FormField name="value" label="จำนวน" required style={{ width: 100 }} style={{ color: 'white' }}>
              <TextInputStyle name="value" placeholder="จำนวน" type="number" />
            </FormField>
            <FormField name="value" label="ค่าส่ง" required style={{ width: 100 }} style={{ color: 'white' }}>
              <TextInputStyle name="value" placeholder="ค่าส่ง" type="number" />
            </FormField>
          </Box>
          <Box direction="row" gap="medium" >
            <FormField name="value" label="การจัดส่ง" required style={{ width: 150 }} style={{ color: 'white' }}>
              <SelectStyle
                options={[
                  { value: 'ลงทะเบียน', label: 'ลงทะเบียน' },
                  { value: 'EMS', label: 'EMS' },
                ]} />
            </FormField>
            <FormField name="value" label="โน๊ต" required style={{ width: 150 }} style={{ color: 'white' }}>
              <TextInputStyle name="value" placeholder="โน๊ต" />
            </FormField>
          </Box>
          <FormField name="value" label="ที่อยู่" required style={{ color: 'white' }}>
            <TextArea name="value" placeholder="ที่อยู่" resize={false} style={{ backgroundColor: 'white' }} />
          </FormField>
        </Form>=
      </Box>
    </>
  )
}

export default Add