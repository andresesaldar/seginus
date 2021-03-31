import React from 'react';
import { MoleculesListTitle } from '../molecules-list-title/MoleculesListTitle';
import { MoleculesListWorktop } from '../molecules-list-worktop/MoleculesListWorktop';

export const MoleculesList: React.FC = () => {
    return (
        <div>
            <MoleculesListTitle />
            <MoleculesListWorktop />
        </div>
    );
};
