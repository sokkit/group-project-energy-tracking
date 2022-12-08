import React from "react";
import { ChangeEvent } from "react";
import { SitesService } from "../../../../services/sites.service";
import { useEffect, useState, useRef } from "react";
import Form from "react-bootstrap/Form";

export interface ISite {
    siteId: number;
    siteName: string;
    siteOrgId: number;
}

interface UploadDropDownProps {
    setSelectedId: any;
}

function UploadDropdown({ setSelectedId }: UploadDropDownProps) {
    const siteService = new SitesService();

    const [allSites, setAllSites] = useState<ISite[]>([]);
    const [selectedOption, setSelectedOption] = useState<number>();

    const selectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        e.preventDefault();
        const value = parseInt(e.target.value);
        setSelectedId(value);
        setSelectedOption(value);
    };

    useEffect(() => {
        const redirect = async () => {
            let sitesList: ISite[] = [];

            const siteRes = await siteService.getSites();
            if (siteRes.data !== undefined) {
                const len = siteRes.data.length;
                for (let index = 0; index < len; index++) {
                    const currentSiteId = siteRes.data[index].siteId;
                    const currentSiteName = siteRes.data[index].name;
                    const currentSiteOrgId: number = siteRes.data[index].orgId;
                    const siteToAdd: ISite = {
                        siteId: currentSiteId,
                        siteName: currentSiteName,
                        siteOrgId: currentSiteOrgId,
                    };
                    sitesList.push(siteToAdd);
                }
            }
            setAllSites(sitesList);
        };
        redirect();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div>
            <Form.Select
                onChange={selectChange}
                data-testid="siteDropdown"
                id="siteDropdown"
                size="sm"
                className="mt-1 mb-1"
            >
                {allSites.map((site, index) => (
                    <option data-testid={index} key={index} value={site.siteId}>
                        {site.siteName}
                    </option>
                ))}
            </Form.Select>
            {selectedOption && <h2>{selectedOption}</h2>}
        </div>
    );
}

export default UploadDropdown;
