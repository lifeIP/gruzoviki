import React from 'react'
import Box from '@mui/material/Box';
import { SvgIcon, Button, IconButton } from "@mui/material"; 
import Typography from '@mui/material/Typography';


export default function MyHeader({selectedTheme, changeTheme}) {

    function RenderLogo(){
        if(selectedTheme == false){
            return (
                <svg width="80" height="48" viewBox="0 0 88 56" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M13.5776 28.6686L12.0064 27.6897L18.0206 17.5822L3.56865 21.6381L3.08152 19.8276L17.2259 15.8578L0 8.93403L0.678342 7.18842L18.4666 14.3385L12.9119 0.722151L14.6116 0L20.2079 13.7169L26.4791 0.312329L28.1417 1.12006L22.1166 13.9983L30.3952 9.90277L31.199 11.5924L22.5471 15.8723L30.3826 18.4865L29.8098 20.271L22.7595 17.9188L29.2621 25.9851L27.8397 27.1775L21.4357 19.2338L22.8179 28.6518L20.997 28.9297L19.498 18.719L13.5776 28.6686Z" fill="white"/>
                    <path d="M37.2399 22.1502C36.687 21.1762 36.4106 20.0089 36.4106 18.6484C36.4106 16.3814 37.2278 14.7699 38.8622 13.5938C40.4966 12.4173 42.8998 11.8292 46.0726 11.8292C47.046 11.8292 48.0674 11.9055 49.1372 12.0591C50.2067 12.2121 51.1619 12.4234 52.0033 12.693L51.8052 15.8926C51.084 15.6107 50.2188 15.1762 49.2095 15.0169C48.2002 14.8577 47.1546 14.7778 46.073 14.7778C44.1141 14.7778 42.016 15.1515 40.9881 15.8992C38.8544 17.6192 39.8213 21.5679 42.7021 22.1987C44.4152 22.5737 46.9132 22.3911 48.5831 21.8983V20.364H44.7977V17.5703H51.9631V24.194C48.1786 25.5055 40.0013 26.4205 37.2403 22.1506L37.2399 22.1502ZM58.3771 18.4389H62.8477C63.7372 18.4389 64.419 18.2642 64.8936 17.9148C65.3681 17.5654 65.6056 17.0541 65.6056 16.3801C65.6056 15.7426 65.3681 15.2529 64.8936 14.9097C64.419 14.5665 63.7367 14.3949 62.8477 14.3949H58.3771V18.4389ZM61.2358 20.8184H58.3771V25.0194H54.9702V12.1526H62.8477C64.8667 12.1526 66.4259 12.5112 67.5256 13.2281C68.6253 13.945 69.1751 14.9715 69.1751 16.3073C69.1751 17.4344 68.7875 18.3383 68.0123 19.0185C67.237 19.6988 66.1105 20.143 64.6322 20.3512L69.5714 25.0198H65.6779L61.2358 20.8188V20.8184ZM88 19.5047C88 23.3647 85.2481 25.2947 79.744 25.2947C74.2523 25.2947 71.5061 23.3647 71.5061 19.5047V12.1521H74.9129V19.5047C74.9129 21.6738 76.5236 22.7581 79.744 22.7581C82.9769 22.7581 84.5931 21.6738 84.5931 19.5047V12.1521H88V19.5047Z" fill="white"/>
                    <path d="M43.0629 55.2969L37.2226 42.43H41.0802L46.452 55.0582H46.542L51.9138 42.43H55.7537L49.8952 55.2969H43.0629ZM61.8449 42.43L58.8118 55.2969H55.405L58.438 42.43H61.8449ZM67.7164 42.43V48.3489L74.6382 42.43H78.9285L71.5736 48.4225L79.0544 55.2973H75.0163L67.7155 48.4777V55.2973H64.3086V42.4305H67.7155L67.7164 42.43ZM87.4575 42.43L84.4244 55.2969H81.0176L84.0506 42.43H87.4575Z" fill="white"/>
                    <path d="M65.1799 40.1167C63.2452 40.1167 60.5063 39.8564 59.1306 39.3354C57.7545 38.8145 56.7032 38.0548 55.976 37.0561C55.2487 36.0573 54.8854 34.8596 54.8854 33.4625C54.8854 32.0411 55.2487 30.8249 55.976 29.8138C56.7032 28.8027 57.7545 28.0307 59.1306 27.4978C60.5068 26.9649 63.2452 26.698 65.1799 26.698C67.1145 26.698 69.8565 26.9645 71.2382 27.4978C72.62 28.0307 73.6747 28.8027 74.4019 29.8138C75.1292 30.8249 75.4926 32.0411 75.4926 33.4625C75.4926 34.8596 75.1292 36.0573 74.4019 37.0561C73.6747 38.0548 72.6204 38.8145 71.2382 39.3354C69.8565 39.856 67.1145 40.1167 65.1799 40.1167ZM53.1934 26.8326V29.2037L44.4308 37.1999H53.5538V39.7179H39.3493V37.3468L47.6088 29.3511H39.7278V26.8326H53.1934ZM58.4726 33.4625C58.4726 34.7246 58.9654 35.7084 59.9509 36.4129C60.9364 37.1174 63.4014 37.4699 65.1799 37.4699C66.9705 37.4699 69.4416 37.1174 70.4271 36.4129C71.4126 35.7084 71.9053 34.7246 71.9053 33.4625C71.9053 32.1633 71.4126 31.1527 70.4271 30.4297C69.4416 29.7066 66.9705 29.3453 65.1799 29.3453C63.4014 29.3453 60.9359 29.7066 59.9509 30.4297C58.9654 31.1527 58.4726 32.1638 58.4726 33.4625Z" fill="white"/>
                </svg>                    
            );
        }
        if(selectedTheme == true)
        {
            return (
                <svg width="80" height="48" viewBox="0 0 88 56" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M13.5776 28.6686L12.0064 27.6897L18.0206 17.5822L3.56865 21.6381L3.08152 19.8276L17.2259 15.8578L0 8.93403L0.678342 7.18842L18.4666 14.3385L12.9119 0.722151L14.6116 0L20.2079 13.7169L26.4791 0.312329L28.1417 1.12006L22.1166 13.9983L30.3952 9.90277L31.199 11.5924L22.5471 15.8723L30.3826 18.4865L29.8098 20.271L22.7595 17.9188L29.2621 25.9851L27.8397 27.1775L21.4357 19.2338L22.8179 28.6518L20.997 28.9297L19.498 18.719L13.5776 28.6686Z" fill="black"/>
                    <path d="M37.2399 22.1502C36.687 21.1762 36.4106 20.0089 36.4106 18.6484C36.4106 16.3814 37.2278 14.7699 38.8622 13.5938C40.4966 12.4173 42.8998 11.8292 46.0726 11.8292C47.046 11.8292 48.0674 11.9055 49.1372 12.0591C50.2067 12.2121 51.1619 12.4234 52.0033 12.693L51.8052 15.8926C51.084 15.6107 50.2188 15.1762 49.2095 15.0169C48.2002 14.8577 47.1546 14.7778 46.073 14.7778C44.1141 14.7778 42.016 15.1515 40.9881 15.8992C38.8544 17.6192 39.8213 21.5679 42.7021 22.1987C44.4152 22.5737 46.9132 22.3911 48.5831 21.8983V20.364H44.7977V17.5703H51.9631V24.194C48.1786 25.5055 40.0013 26.4205 37.2403 22.1506L37.2399 22.1502ZM58.3771 18.4389H62.8477C63.7372 18.4389 64.419 18.2642 64.8936 17.9148C65.3681 17.5654 65.6056 17.0541 65.6056 16.3801C65.6056 15.7426 65.3681 15.2529 64.8936 14.9097C64.419 14.5665 63.7367 14.3949 62.8477 14.3949H58.3771V18.4389ZM61.2358 20.8184H58.3771V25.0194H54.9702V12.1526H62.8477C64.8667 12.1526 66.4259 12.5112 67.5256 13.2281C68.6253 13.945 69.1751 14.9715 69.1751 16.3073C69.1751 17.4344 68.7875 18.3383 68.0123 19.0185C67.237 19.6988 66.1105 20.143 64.6322 20.3512L69.5714 25.0198H65.6779L61.2358 20.8188V20.8184ZM88 19.5047C88 23.3647 85.2481 25.2947 79.744 25.2947C74.2523 25.2947 71.5061 23.3647 71.5061 19.5047V12.1521H74.9129V19.5047C74.9129 21.6738 76.5236 22.7581 79.744 22.7581C82.9769 22.7581 84.5931 21.6738 84.5931 19.5047V12.1521H88V19.5047Z" fill="black"/>
                    <path d="M43.0629 55.2969L37.2226 42.43H41.0802L46.452 55.0582H46.542L51.9138 42.43H55.7537L49.8952 55.2969H43.0629ZM61.8449 42.43L58.8118 55.2969H55.405L58.438 42.43H61.8449ZM67.7164 42.43V48.3489L74.6382 42.43H78.9285L71.5736 48.4225L79.0544 55.2973H75.0163L67.7155 48.4777V55.2973H64.3086V42.4305H67.7155L67.7164 42.43ZM87.4575 42.43L84.4244 55.2969H81.0176L84.0506 42.43H87.4575Z" fill="black"/>
                    <path d="M65.1799 40.1167C63.2452 40.1167 60.5063 39.8564 59.1306 39.3354C57.7545 38.8145 56.7032 38.0548 55.976 37.0561C55.2487 36.0573 54.8854 34.8596 54.8854 33.4625C54.8854 32.0411 55.2487 30.8249 55.976 29.8138C56.7032 28.8027 57.7545 28.0307 59.1306 27.4978C60.5068 26.9649 63.2452 26.698 65.1799 26.698C67.1145 26.698 69.8565 26.9645 71.2382 27.4978C72.62 28.0307 73.6747 28.8027 74.4019 29.8138C75.1292 30.8249 75.4926 32.0411 75.4926 33.4625C75.4926 34.8596 75.1292 36.0573 74.4019 37.0561C73.6747 38.0548 72.6204 38.8145 71.2382 39.3354C69.8565 39.856 67.1145 40.1167 65.1799 40.1167ZM53.1934 26.8326V29.2037L44.4308 37.1999H53.5538V39.7179H39.3493V37.3468L47.6088 29.3511H39.7278V26.8326H53.1934ZM58.4726 33.4625C58.4726 34.7246 58.9654 35.7084 59.9509 36.4129C60.9364 37.1174 63.4014 37.4699 65.1799 37.4699C66.9705 37.4699 69.4416 37.1174 70.4271 36.4129C71.4126 35.7084 71.9053 34.7246 71.9053 33.4625C71.9053 32.1633 71.4126 31.1527 70.4271 30.4297C69.4416 29.7066 66.9705 29.3453 65.1799 29.3453C63.4014 29.3453 60.9359 29.7066 59.9509 30.4297C58.9654 31.1527 58.4726 32.1638 58.4726 33.4625Z" fill="black"/>
                </svg>

            );
        }
    }

    function RenderPhoneLogo(){
        if(selectedTheme)
            return(
                <svg width="15" height="20" viewBox="0 0 27 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1.8977 1.38967L6.8528 0.07512C8.01251 -0.237868 9.17222 0.450708 9.59393 1.70267L11.9134 8.08765C12.3351 9.21443 12.0715 10.5916 11.2281 11.4053L9.11951 13.4711C10.5955 16.7262 12.9149 19.4179 15.656 21.2332L17.3956 18.7293C18.0809 17.7277 19.2406 17.4148 20.1894 17.9155L25.5662 20.6073C26.6206 21.1706 27.2003 22.5478 26.9367 23.9249L25.8297 29.8092C25.5662 31.1238 24.5647 32 23.4577 32C10.5428 32 0 19.6057 0 4.20658C0 2.89202 0.790707 1.70267 1.8977 1.38967ZM23.3523 28.9954L24.4593 23.3615L19.2933 20.7325L16.3413 24.9891C11.1226 22.047 8.43422 18.8545 5.95667 12.6573L9.54122 9.15184L7.32722 3.01723L2.53026 4.33177C2.58299 17.9155 11.9134 28.9327 23.3523 28.9954Z" fill="black"/>
                </svg>
            );
        else{
            return(
                <svg width="15" height="20" viewBox="0 0 27 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1.8977 1.38967L6.8528 0.07512C8.01251 -0.237868 9.17222 0.450708 9.59393 1.70267L11.9134 8.08765C12.3351 9.21443 12.0715 10.5916 11.2281 11.4053L9.11951 13.4711C10.5955 16.7262 12.9149 19.4179 15.656 21.2332L17.3956 18.7293C18.0809 17.7277 19.2406 17.4148 20.1894 17.9155L25.5662 20.6073C26.6206 21.1706 27.2003 22.5478 26.9367 23.9249L25.8297 29.8092C25.5662 31.1238 24.5647 32 23.4577 32C10.5428 32 0 19.6057 0 4.20658C0 2.89202 0.790707 1.70267 1.8977 1.38967ZM23.3523 28.9954L24.4593 23.3615L19.2933 20.7325L16.3413 24.9891C11.1226 22.047 8.43422 18.8545 5.95667 12.6573L9.54122 9.15184L7.32722 3.01723L2.53026 4.33177C2.58299 17.9155 11.9134 28.9327 23.3523 28.9954Z" fill="white"/>
                </svg>
            );
        }
    }

    function RenderPhoneNumber(){
        return(
            <Typography variant="h7" gutterBottom>
                22-22-22
            </Typography>
        );
    }


    function RenderSocialNetworks() {
        if (selectedTheme) {
            return (
                <Box component="span">
                    <IconButton sx={{ height: 40, width: 40 }} >
                        <SvgIcon htmlColor="#000000" sx={{ height: 40, width: 40 }}>
                        <svg fill="#000000" width="800px" height="800px" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10 .4C4.698.4.4 4.698.4 10s4.298 9.6 9.6 9.6 9.6-4.298 9.6-9.6S15.302.4 10 .4zm3.692 10.831s.849.838 1.058 1.227c.006.008.009.016.011.02.085.143.105.254.063.337-.07.138-.31.206-.392.212h-1.5c-.104 0-.322-.027-.586-.209-.203-.142-.403-.375-.598-.602-.291-.338-.543-.63-.797-.63a.305.305 0 0 0-.095.015c-.192.062-.438.336-.438 1.066 0 .228-.18.359-.307.359h-.687c-.234 0-1.453-.082-2.533-1.221-1.322-1.395-2.512-4.193-2.522-4.219-.075-.181.08-.278.249-.278h1.515c.202 0 .268.123.314.232.054.127.252.632.577 1.2.527.926.85 1.302 1.109 1.302a.3.3 0 0 0 .139-.036c.338-.188.275-1.393.26-1.643 0-.047-.001-.539-.174-.775-.124-.171-.335-.236-.463-.26a.55.55 0 0 1 .199-.169c.232-.116.65-.133 1.065-.133h.231c.45.006.566.035.729.076.33.079.337.292.308 1.021-.009.207-.018.441-.018.717 0 .06-.003.124-.003.192-.01.371-.022.792.24.965a.216.216 0 0 0 .114.033c.091 0 .365 0 1.107-1.273a9.718 9.718 0 0 0 .595-1.274c.015-.026.059-.106.111-.137a.266.266 0 0 1 .124-.029h1.781c.194 0 .327.029.352.104.044.119-.008.482-.821 1.583l-.363.479c-.737.966-.737 1.015.046 1.748z"/>
                        </svg>
                        </SvgIcon>
                    </IconButton>
                    <IconButton sx={{ height: 40, width: 40 }}>
                        <SvgIcon sx={{ height: 40, width: 40 }}>
                            <svg width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M21.997 12C21.997 17.5228 17.5198 22 11.997 22C6.47415 22 1.99699 17.5228 1.99699 12C1.99699 6.47715 6.47415 2 11.997 2C17.5198 2 21.997 6.47715 21.997 12ZM12.3553 9.38244C11.3827 9.787 9.43876 10.6243 6.52356 11.8944C6.05018 12.0827 5.8022 12.2669 5.77962 12.4469C5.74147 12.7513 6.12258 12.8711 6.64155 13.0343C6.71214 13.0565 6.78528 13.0795 6.86026 13.1038C7.37085 13.2698 8.05767 13.464 8.41472 13.4717C8.7386 13.4787 9.10009 13.3452 9.49918 13.0711C12.2229 11.2325 13.629 10.3032 13.7172 10.2831C13.7795 10.269 13.8658 10.2512 13.9243 10.3032C13.9828 10.3552 13.977 10.4536 13.9708 10.48C13.9331 10.641 12.4371 12.0318 11.6629 12.7515C11.4216 12.9759 11.2504 13.135 11.2154 13.1714C11.137 13.2528 11.0571 13.3298 10.9803 13.4038C10.506 13.8611 10.1502 14.204 11 14.764C11.4083 15.0331 11.7351 15.2556 12.0611 15.4776C12.4171 15.7201 12.7722 15.9619 13.2317 16.2631C13.3487 16.3398 13.4605 16.4195 13.5694 16.4971C13.9837 16.7925 14.3559 17.0579 14.8158 17.0155C15.083 16.991 15.359 16.7397 15.4992 15.9903C15.8305 14.2193 16.4817 10.382 16.6322 8.80081C16.6454 8.66228 16.6288 8.48498 16.6154 8.40715C16.6021 8.32932 16.5743 8.21842 16.4731 8.13633C16.3533 8.03911 16.1683 8.01861 16.0856 8.02C15.7095 8.0267 15.1324 8.22735 12.3553 9.38244Z" stroke="#000000" stroke-linejoin="round" />
                            </svg>
                        </SvgIcon>
                    </IconButton>
                    <IconButton sx={{height: 40, width: 40}}
                    onClick={()=>{
                        changeTheme();
                    }}
                    >
                        <SvgIcon>
                            <svg width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 11.5373 21.3065 11.4608 21.0672 11.8568C19.9289 13.7406 17.8615 15 15.5 15C11.9101 15 9 12.0899 9 8.5C9 6.13845 10.2594 4.07105 12.1432 2.93276C12.5392 2.69347 12.4627 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" fill="#000000"/>
                            </svg>
                        </SvgIcon>
                    </IconButton>
                </Box>
            );
        }
        else {
            return (
                <Box component="span">
                    <IconButton sx={{ height: 40, width: 40 }} >
                        <SvgIcon sx={{ height: 40, width: 40 }}>
                        <svg fill="#FFFFFF" width="800px" height="800px" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10 .4C4.698.4.4 4.698.4 10s4.298 9.6 9.6 9.6 9.6-4.298 9.6-9.6S15.302.4 10 .4zm3.692 10.831s.849.838 1.058 1.227c.006.008.009.016.011.02.085.143.105.254.063.337-.07.138-.31.206-.392.212h-1.5c-.104 0-.322-.027-.586-.209-.203-.142-.403-.375-.598-.602-.291-.338-.543-.63-.797-.63a.305.305 0 0 0-.095.015c-.192.062-.438.336-.438 1.066 0 .228-.18.359-.307.359h-.687c-.234 0-1.453-.082-2.533-1.221-1.322-1.395-2.512-4.193-2.522-4.219-.075-.181.08-.278.249-.278h1.515c.202 0 .268.123.314.232.054.127.252.632.577 1.2.527.926.85 1.302 1.109 1.302a.3.3 0 0 0 .139-.036c.338-.188.275-1.393.26-1.643 0-.047-.001-.539-.174-.775-.124-.171-.335-.236-.463-.26a.55.55 0 0 1 .199-.169c.232-.116.65-.133 1.065-.133h.231c.45.006.566.035.729.076.33.079.337.292.308 1.021-.009.207-.018.441-.018.717 0 .06-.003.124-.003.192-.01.371-.022.792.24.965a.216.216 0 0 0 .114.033c.091 0 .365 0 1.107-1.273a9.718 9.718 0 0 0 .595-1.274c.015-.026.059-.106.111-.137a.266.266 0 0 1 .124-.029h1.781c.194 0 .327.029.352.104.044.119-.008.482-.821 1.583l-.363.479c-.737.966-.737 1.015.046 1.748z"/>
                        </svg>
                        </SvgIcon>
                    </IconButton>
                    <IconButton sx={{ height: 40, width: 40 }}>
                        <SvgIcon sx={{ height: 40, width: 40 }}>
                            <svg width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M21.997 12C21.997 17.5228 17.5198 22 11.997 22C6.47415 22 1.99699 17.5228 1.99699 12C1.99699 6.47715 6.47415 2 11.997 2C17.5198 2 21.997 6.47715 21.997 12ZM12.3553 9.38244C11.3827 9.787 9.43876 10.6243 6.52356 11.8944C6.05018 12.0827 5.8022 12.2669 5.77962 12.4469C5.74147 12.7513 6.12258 12.8711 6.64155 13.0343C6.71214 13.0565 6.78528 13.0795 6.86026 13.1038C7.37085 13.2698 8.05767 13.464 8.41472 13.4717C8.7386 13.4787 9.10009 13.3452 9.49918 13.0711C12.2229 11.2325 13.629 10.3032 13.7172 10.2831C13.7795 10.269 13.8658 10.2512 13.9243 10.3032C13.9828 10.3552 13.977 10.4536 13.9708 10.48C13.9331 10.641 12.4371 12.0318 11.6629 12.7515C11.4216 12.9759 11.2504 13.135 11.2154 13.1714C11.137 13.2528 11.0571 13.3298 10.9803 13.4038C10.506 13.8611 10.1502 14.204 11 14.764C11.4083 15.0331 11.7351 15.2556 12.0611 15.4776C12.4171 15.7201 12.7722 15.9619 13.2317 16.2631C13.3487 16.3398 13.4605 16.4195 13.5694 16.4971C13.9837 16.7925 14.3559 17.0579 14.8158 17.0155C15.083 16.991 15.359 16.7397 15.4992 15.9903C15.8305 14.2193 16.4817 10.382 16.6322 8.80081C16.6454 8.66228 16.6288 8.48498 16.6154 8.40715C16.6021 8.32932 16.5743 8.21842 16.4731 8.13633C16.3533 8.03911 16.1683 8.01861 16.0856 8.02C15.7095 8.0267 15.1324 8.22735 12.3553 9.38244Z" stroke="#FFFFFF" stroke-linejoin="round" />
                            </svg>
                        </SvgIcon>
                    </IconButton>

                    <IconButton sx={{height: 40, width: 40}}
                    onClick={()=>{
                        changeTheme();
                    }}
                    >
                        <SvgIcon>
                            <svg width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 11.5373 21.3065 11.4608 21.0672 11.8568C19.9289 13.7406 17.8615 15 15.5 15C11.9101 15 9 12.0899 9 8.5C9 6.13845 10.2594 4.07105 12.1432 2.93276C12.5392 2.69347 12.4627 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" fill="#FFFFFF"/>
                            </svg>
                        </SvgIcon>
                    </IconButton>

                </Box>
            );
        }
    }

    function RenderRightPanel(){
        if(selectedTheme){
            return(
                <Box component="div" sx={{ marginLeft: 8, display: 'inline' }}>
                    <Button sx={{color: "#000000"}}><Typography variant="h7" gutterBottom>Калькулятор</Typography></Button>
                    <Button sx={{color: "#000000"}}><Typography variant="h7" gutterBottom>Профиль</Typography></Button>
                    <Button sx={{color: "#000000"}}><Typography variant="h7" gutterBottom>Заказы</Typography></Button>
                    <Button sx={{color: "#000000"}}><Typography variant="h7" gutterBottom>О нас</Typography></Button>
                </Box>
            );
        }
        else{
            return(
                <Box component="div" sx={{ marginLeft: 8, display: 'inline' }}>
                    <Button color="primary" sx={{color: "#FFFFFF"}}><Typography variant="h7" gutterBottom>Калькулятор</Typography></Button>
                    <Button color="primary" sx={{color: "#FFFFFF"}}><Typography variant="h7" gutterBottom>Профиль</Typography></Button>
                    <Button color="primary" sx={{color: "#FFFFFF"}}><Typography variant="h7" gutterBottom>Заказы</Typography></Button>
                    <Button color="primary" sx={{color: "#FFFFFF"}}><Typography variant="h7" gutterBottom>О нас</Typography></Button>
                </Box>
            );  
        }
    }

  return (
    <Box 
    
        component="span"
        m={0}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
    >
        <Box 
        display="flex"
        alignItems="center"
        minHeight="10vh"
        >
            <Box component="div" sx={{ marginLeft: 8, display: 'inline' }}>
                <Button>
                    <RenderLogo/>
                </Button>
            </Box>
            <Box component="div" sx={{ marginLeft: 2 ,  display: 'inline' }}>
                <RenderPhoneLogo/>
            </Box>

            <Box component="div" sx={{ marginLeft: 1.5 ,  display: 'inline' }}>
                <RenderPhoneNumber/>
            </Box>

            <Box component="div" sx={{ marginLeft: 2.5 , display: 'inline' }}>
                <RenderSocialNetworks/>
            </Box>
            
        </Box>
        <Box component="div" sx={{ marginRight: 8 , display: 'inline' }}>
            <RenderRightPanel/>
        </Box>
    </Box>
  )
}
