import { Check, Clear } from '@mui/icons-material'
import { IconButton, Typography } from '@mui/material'
import Grid from '@mui/material/Grid'
import { Box } from '@mui/system'
import { DateTime } from 'luxon'
import { useContext, useState } from 'react'
import { addMedicationAdministration } from '../../api/patient'
import UserContext from '../../context/user-context'
import { getMedicationIdFromCarePlan } from '../../utility/fhir-utilities'
import Loading from '../Loading'
import SectionTitle from '../Text/SectionTitle'
import classes from './styles.module.scss'

export default function ReportMedAdmin() {

    const [loading,setLoading] = useState<boolean>(false);
    const { user, carePlan, medicationDates, updateMedicationDates } = useContext(UserContext);

    const medicationID = () => {
        return getMedicationIdFromCarePlan(carePlan)
    }
    const handleYes = () => {
        handleSubmission(true)
    }

    const handleNo = () => {
        handleSubmission(false)
    }

    const handleSubmission = async (tookMedication : boolean) => {
        const idForUpload = medicationID();
        if(user?.id && idForUpload){
            setLoading(true)
            await addMedicationAdministration(user.id,idForUpload,tookMedication)
            setLoading(false)
            !!updateMedicationDates && updateMedicationDates()
        }
    }

    const hasAlreadyReported = !!medicationDates?.get(DateTime.local().toISODate())

    return (
        <Box padding="1em">
            {loading ? <Loading /> : <>
            <SectionTitle>Have you taken your medication today?</SectionTitle>
            {hasAlreadyReported ? <p>Great job! Please check back in tomorrow when you have taken your medication</p> : <Grid className={classes.container} container>
                <IconButton onClick={handleYes} className={classes.yes}>
                    <Check />
                </IconButton>
                <Box width="1em" />
                <IconButton onClick={handleNo} className={classes.no}>
                    <Clear />
                </IconButton>
            </Grid>}
            </>}
        </Box>
    )
}