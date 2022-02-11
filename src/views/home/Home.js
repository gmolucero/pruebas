import React from 'react';
import {
    CCol,
    CContainer,
    CRow,
} from "@coreui/react";
import ImgFondo from "../../assets/img/bg-1.png";

import { useStepper,useStepData} from 'context/hooks';

var styles = {
    backgroundImage: `url(${ImgFondo})`,
    backgroundSize: "cover",
};


const Home = ({ history }) => {
    const [step, setStepper] = useStepper();
    const [stepKeepData, setStepKeepData] = useStepData('');

    React.useEffect(() => {
        if (step !== 1) setStepper(1)
        if (stepKeepData) setStepKeepData('')
    }, [])

    return (
        <div
            className="c-app c-default-layout flex-row c-home"
        >

            <CContainer fluid={true}>
                <CRow className="justify-content-center h-100">
                    <CCol md="6" style={styles} className="align-items-center d-none d-md-inline" />
                    <CCol md="6">
                        <CRow className="justify-content-center align-items-center h-100 pt-5">
                            <CCol md={10} className="text-center">
                                <h1 className="text-primary bold f-48">¡Solicita tu producto!</h1>
                                <p className="f-24 mb-5">Revisa tus créditos solicitados en {process.env.REACT_APP_NAME}</p>

                                <button onClick={() => history.push(`/cotizacion`)} className="card bg-secondary text-center p-4 d-inline-flex">
                                    <svg className="m-auto mb-4" width="105" height="102" viewBox="0 0 105 102" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path opacity="0.098" d="M56.9088 101.25C83.1697 101.25 104.458 79.9835 104.458 53.75C104.458 27.5165 83.1697 6.25 56.9088 6.25C30.6479 6.25 9.35925 27.5165 9.35925 53.75C9.35925 79.9835 30.6479 101.25 56.9088 101.25Z" fill="white" />
                                        <path d="M34.7729 34.673C38.2052 34.673 41.5603 33.6563 44.4142 31.7514C47.268 29.8465 49.4923 27.1391 50.8058 23.9714C52.1194 20.8037 52.4631 17.3181 51.7936 13.9553C51.124 10.5924 49.4713 7.50345 47.0444 5.07893C44.6175 2.65441 41.5254 1.00324 38.1591 0.334213C34.7928 -0.334814 31.3035 0.00835442 28.1325 1.32032C24.9614 2.63229 22.251 4.85413 20.344 7.70489C18.437 10.5556 17.419 13.9073 17.4188 17.336C17.4187 19.6127 17.8675 21.8671 18.7395 23.9705C19.6116 26.0739 20.8899 27.9851 22.5014 29.595C24.1128 31.2049 26.026 32.482 28.1315 33.3533C30.2371 34.2245 32.4938 34.673 34.7729 34.673ZM34.7729 3.15198C37.5811 3.15198 40.3263 3.98386 42.6613 5.54242C44.9963 7.10098 46.8162 9.31621 47.8908 11.908C48.9655 14.4998 49.2467 17.3517 48.6988 20.1031C48.151 22.8546 46.7987 25.3819 44.8129 27.3656C42.8272 29.3492 40.2972 30.7001 37.5429 31.2474C34.7886 31.7947 31.9337 31.5138 29.3392 30.4403C26.7448 29.3667 24.5272 27.5487 22.967 25.2162C21.4069 22.8836 20.5741 20.1413 20.5741 17.336C20.5741 13.5741 22.07 9.96639 24.7328 7.30638C27.3956 4.64636 31.0071 3.15198 34.7729 3.15198Z" fill="white" />
                                        <path d="M33.1962 28.369H36.3474V25.217C36.7618 25.217 37.1721 25.1354 37.5549 24.977C37.9377 24.8186 38.2855 24.5864 38.5785 24.2938C38.8715 24.0011 39.1039 23.6536 39.2625 23.2712C39.4211 22.8888 39.5027 22.4789 39.5027 22.065V18.912C39.5027 18.076 39.1703 17.2743 38.5785 16.6832C37.9868 16.092 37.1842 15.76 36.3474 15.76H33.1962V12.604H39.5027V9.45596H36.3474V6.30396H33.1962V9.45596C32.36 9.45596 31.5581 9.78749 30.9665 10.3777C30.3749 10.968 30.042 11.7687 30.0409 12.604V15.756C30.0409 16.5919 30.3733 17.3936 30.965 17.9848C31.5568 18.5759 32.3593 18.908 33.1962 18.908H36.3474V22.064H30.0409V25.216H33.1962V28.369Z" fill="white" />
                                        <path d="M94.7253 3.15201H91.566V0H88.4147V3.15201H85.2594V6.30002H88.4147V9.45203H91.566V6.30002H94.7213L94.7253 3.15201Z" fill="white" />
                                        <path d="M88.4107 17.3359H85.2594V20.4879H82.1041V23.636H85.2594V26.788H88.4107V23.636H91.566V20.4879H88.4107V17.3359Z" fill="white" />
                                        <path d="M64.75 11.0319H67.9013V7.87592H71.0566V4.72793H67.9013V1.57593H64.75V4.72793H61.5947V7.87592H64.75V11.0319Z" fill="white" />
                                        <path d="M60.0171 78.8021H75.7935C83.4925 78.8021 89.9923 71.5841 89.9923 63.0421V56.7421C89.9923 48.5621 85.1172 38.066 78.7746 32.014C79.3847 31.5252 79.8626 30.8914 80.1645 30.1707C80.4665 29.4499 80.583 28.6651 80.5033 27.8879C80.4237 27.1106 80.1505 26.3657 79.7086 25.721C79.2668 25.0763 78.6704 24.5524 77.9738 24.197L82.028 11.51C82.1213 11.2309 82.1322 10.9309 82.0594 10.6458C81.9867 10.3606 81.8333 10.1024 81.6176 9.90204C81.4043 9.69558 81.1369 9.55349 80.8463 9.4921C80.5557 9.43072 80.2536 9.45253 79.9749 9.55504L67.7351 14.137L57.0821 12.624C56.8234 12.5831 56.5586 12.6094 56.3131 12.7005C56.0676 12.7916 55.8498 12.9444 55.6806 13.144C55.5105 13.3402 55.3901 13.5743 55.3296 13.8267C55.2692 14.079 55.2704 14.3422 55.3332 14.594L57.9049 24.161C57.1973 24.5081 56.5889 25.0278 56.1359 25.6722C55.6829 26.3166 55.4 27.0648 55.3135 27.8475C55.2269 28.6301 55.3395 29.422 55.6408 30.1496C55.9421 30.8772 56.4223 31.5171 57.037 32.01C50.6924 38.061 45.8173 48.5551 45.8173 56.7371V57.7931L32.3603 50.6221C32.1489 50.5058 31.913 50.441 31.6717 50.4329C31.4305 50.4247 31.1907 50.4734 30.9719 50.5751L18.9974 55.8861V55.1611C18.9974 54.7431 18.8312 54.3422 18.5353 54.0467C18.2395 53.7511 17.8382 53.5851 17.4198 53.5851H11.1132C10.6948 53.5851 10.2935 53.7511 9.99765 54.0467C9.70179 54.3422 9.53557 54.7431 9.53557 55.1611V56.1221L2.14688 53.6641C1.90966 53.586 1.65727 53.5654 1.4105 53.6038C1.16372 53.6422 0.929605 53.7386 0.727403 53.8851C0.521943 54.0284 0.354328 54.2194 0.238914 54.4416C0.1235 54.6638 0.0637271 54.9107 0.0647135 55.1611V83.5301C0.063565 83.7806 0.123261 84.0276 0.238681 84.2501C0.354102 84.4725 0.521803 84.6636 0.727403 84.8071C0.990438 85.0061 1.31244 85.1116 1.64236 85.1071C1.81201 85.1035 1.9804 85.077 2.14288 85.0281L9.52656 82.5691V83.5301C9.52656 83.948 9.69278 84.3489 9.98864 84.6445C10.2845 84.94 10.6858 85.1061 11.1042 85.1061H17.4108C17.808 85.103 18.1895 84.9503 18.479 84.6786C18.7685 84.4068 18.9447 84.0359 18.9724 83.6401L32.2182 94.2151C32.4942 94.4402 32.8398 94.5628 33.1962 94.5621H78.9468C80.6205 94.5621 82.2256 93.8979 83.4091 92.7157C84.5925 91.5334 85.2574 89.93 85.2574 88.2581C85.2574 86.5861 84.5925 84.9827 83.4091 83.8005C82.2256 82.6182 80.6205 81.9541 78.9468 81.9541H47.9475L36.1152 72.4981H48.8155C50.0275 74.3807 51.6815 75.939 53.6337 77.0377C55.5859 78.1363 57.7772 78.742 60.0171 78.8021ZM9.53157 79.2431L3.225 81.3431V57.3551L9.53157 59.4551V79.2431ZM15.8381 81.9541H12.6858V56.7371H15.8411L15.8381 81.9541ZM67.6841 17.32C67.9443 17.3575 68.2097 17.3303 68.4569 17.241L78.0339 13.648L74.8305 23.64H61.0422L59.0071 16.075L67.6841 17.32ZM60.0161 26.792H75.7935C76.212 26.792 76.6132 26.9581 76.9091 27.2536C77.205 27.5492 77.3712 27.9501 77.3712 28.368C77.3712 28.786 77.205 29.1869 76.9091 29.4824C76.6132 29.778 76.212 29.944 75.7935 29.944H60.0171C59.5987 29.944 59.1974 29.778 58.9016 29.4824C58.6057 29.1869 58.4395 28.786 58.4395 28.368C58.4395 27.9501 58.6057 27.5492 58.9016 27.2536C59.1974 26.9581 59.5987 26.792 60.0171 26.792H60.0161ZM48.9726 56.7371C48.9726 48.8571 54.2581 38.187 60.5847 33.096H75.2259C81.5525 38.187 86.838 48.8561 86.838 56.7371V63.0371C86.838 69.7511 81.6787 75.6451 75.7945 75.6451H60.0171C58.659 75.6177 57.32 75.3191 56.0791 74.767C54.8382 74.2149 53.7204 73.4203 52.7916 72.4301C53.918 72.2709 54.9494 71.7119 55.6968 70.8552C56.4443 69.9985 56.8579 68.9015 56.8618 67.7651V64.6171C56.8639 64.3314 56.7869 64.0507 56.6394 63.806C56.4919 63.5612 56.2796 63.3619 56.026 63.2301L48.9736 59.4631L48.9726 56.7371ZM30.6405 72.1551L46.413 84.7551C46.689 84.9802 47.0346 85.1028 47.391 85.1021H78.9468C79.7637 85.1311 80.5374 85.4758 81.1049 86.0633C81.6725 86.6509 81.9897 87.4355 81.9897 88.2521C81.9897 89.0686 81.6725 89.8533 81.1049 90.4408C80.5374 91.0284 79.7637 91.373 78.9468 91.4021H33.7488L18.9974 79.6211V59.3371L31.5555 53.7551L53.7065 65.5551V67.7611C53.7065 68.179 53.5403 68.5799 53.2445 68.8755C52.9486 69.171 52.5473 69.3371 52.1289 69.3371H31.6186C31.2925 69.3385 30.9749 69.4407 30.7094 69.6298C30.4439 69.8189 30.2436 70.0856 30.136 70.3931C30.0215 70.7022 30.0087 71.0397 30.0994 71.3566C30.1902 71.6735 30.3797 71.9532 30.6405 72.1551Z" fill="white" />
                                        <path d="M69.4829 52.009H66.3276C65.0723 52.009 63.8685 51.5109 62.9809 50.6242C62.0933 49.7376 61.5946 48.535 61.5946 47.281C61.5946 46.0271 62.0933 44.8245 62.9809 43.9378C63.8685 43.0512 65.0723 42.553 66.3276 42.553H75.7935V39.401H69.4869V36.249H66.3276V39.401C64.2355 39.401 62.2291 40.2312 60.7498 41.709C59.2704 43.1868 58.4393 45.1911 58.4393 47.281C58.4393 49.3709 59.2704 51.3752 60.7498 52.853C62.2291 54.3308 64.2355 55.161 66.3276 55.161H69.4829C70.7382 55.161 71.942 55.6591 72.8296 56.5458C73.7172 57.4325 74.2159 58.6351 74.2159 59.889C74.2159 61.143 73.7172 62.3455 72.8296 63.2322C71.942 64.1189 70.7382 64.617 69.4829 64.617H60.017V67.769H66.3236V70.921H69.4789V67.77C71.571 67.77 73.5774 66.9398 75.0568 65.462C76.5361 63.9842 77.3672 61.9799 77.3672 59.89C77.3672 57.8001 76.5361 55.7958 75.0568 54.318C73.5774 52.8402 71.571 52.01 69.4789 52.01L69.4829 52.009Z" fill="white" />
                                    </svg>

                                    <p className="mb-0 mt-3 text-white">COTIZA CRÉDITO DE CONSUMO</p>
                                </button>
                            </CCol>
                        </CRow>
                    </CCol>
                </CRow>
            </CContainer>
        </div>
    )
}

export default Home;