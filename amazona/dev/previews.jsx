import React from 'react';
import {ComponentPreview, Previews} from '@react-buddy/ide-toolbox';
import {PaletteTree} from './palette';
import Layout from "../components/Layout";

const ComponentPreviews = () => {
    return (
        <Previews palette={<PaletteTree/>}>
            <ComponentPreview path="/Layout">
                <Layout/>
            </ComponentPreview>
        </Previews>
    );
};

export default ComponentPreviews;