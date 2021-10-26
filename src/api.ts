import keycloak from "./keycloak";
import CreatePatientInputs from "./types/create-patient";
import {HumanName, Patient} from "fhir/r4";


// function initHeaders(): HeadersInit {
//     let headers = new Headers();
//     console.log(keycloak.token)
//     headers.set('Authorization', `Bearer ${keycloak.token}`);
//     return headers
// }

export default class Fhir {

    // static requestHeaders: HeadersInit = initHeaders()
    static baseURL = "http://localhost:8100"

    static getProviderProfile(){
        return this.fhirFetch(`PractitionerRole?_identifier=keycloak/${keycloak?.tokenParsed?.sub}`)
    }

    static getPatients(organizationId : number){
        return this.fhirFetch(`Patient?organization=${organizationId.toString()}`)
    }

    static getSimpleSurvey(id : string) {
        return this.fhirFetch(`Questionnaire/${id}`)
    }

    static fetchPatients() {
        return this.fhirFetch('Patient')
    }

    static uploadPhoto(photoBlob: Blob){
        let formData = new FormData();
        formData.append('file', photoBlob)
        return this.fileFetch('files',{method: "POST",body: formData})
    }

    static getPhoto(url: string){
        return fetch(`${this.baseURL}/${url}`, { headers: {'Authorization': `Bearer ${keycloak.token}`} }).then(res => { return res.blob() })
    }

    static fhirFetch(resource: string, options? : RequestInit ): Promise<any> {
        return fetch(`${this.baseURL}/fhir/${resource}`, { headers: {'Content-Type': "application/fhir+json"}, ...options }).then(res => { return res.json() })
    }

    static fileFetch(resource: string, options? : RequestInit ): Promise<any> {
        return fetch(`${this.baseURL}/${resource}`, { headers: {'Authorization': `Bearer ${keycloak.token}`}, ...options }).then(res => { return res.json() })
    }

    static testCreatePatient(inputs : CreatePatientInputs) : void {

        // const patientName : HumanName = {given: [inputs.givenName], family: inputs.familyName}

        // let patient = { 
        //     givenName: inputs.givenName
        //     familyName: inputs.familyName
        //     active: true,
        //     identifier: [{system: "https://localhost:3000", value: inputs.username}]
        // }

        fetch(`${this.baseURL}/create-patient`, { body: JSON.stringify(inputs), method: "POST", 
        headers: {'Authorization': `Bearer ${keycloak.token}`, 'Content-Type': "application/json"}})
        .then(res => { return res.json() })
        .then(res => {console.log(res)})
        .catch(err => {console.log(err)})
    }


}