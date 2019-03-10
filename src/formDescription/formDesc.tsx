import ProfileFormDesc, { SelectTextOption } from "../interfaces/profileInterfaces";


const globalOptions: SelectTextOption[] = [
    {
        text: 'dns_idle',
        format: /.\*/
    },
    {
        text: 'dns_max_txt',
        format: /.\*/
    },
    {
        text: 'dns_sleep',
        format: /.\*/
    },
    {
        text: 'dns_stager_prepend',
        format: /.\*/
    },
    {
        text: 'dns_stager_subhost',
        format: /.\*/
    },
    {
        text: 'dns_ttl',
        format: /.\*/
    },
    {
        text: 'host_stage',
        format: /.\*/
    },
    {
        text: 'jitter',
        format: /.\*/
    },
    {
        text: 'maxdns',
        format: /.\*/
    },
    {
        text: 'pipename',
        format: /.\*/
    },
    {
        text: 'pipename_stager',
        format: /.\*/
    },
    {
        text: 'sleeptime',
        format: /.\*/
    },
    {
        text: 'spawnto_x86',
        format: /.\*/
    },
    {
        text: 'spawnto_x64',
        format: /.\*/
    },
    {
        text: 'useragent',
        format: /.\*/
    }
]
const cobaltStrikeProfile: ProfileFormDesc = {
    sections: [
        {
            title: 'Global Options',
            fields: [
                {
                    type: 'selectText',
                    options: globalOptions,
                    path: 'globaloptions',
                }
            ]
        }
    ]
}

export default cobaltStrikeProfile;