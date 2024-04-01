import './App.css'
import Select from 'react-select';
import {useMemo, useState} from "react";
import {colors} from "./colors.ts";
import {useSimilaritySelect} from "../lib/main.ts";

function App() {
    const [lang, setLang] = useState<'en' | 'he'>('en');

    const currentColors = useMemo(() => {
        return colors.map((color) => ({
                value: color.value,
                label: color.labels[lang]
            })
        )
    }, [lang]);

    const {
        options,
        onInputChange,
        filterOptions
    } = useSimilaritySelect({
        initialOptions: currentColors,
        addDistance: true,
    });
    return (
        <div
            style={{
                paddingTop: '3rem',
            }}>
            <h1
                style={{
                    textAlign: 'center',
                }}
            >
                React Select with Similarity Search
            </h1>
            <hr />
            <div
                id={'form'}
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                }}
            >
                <label
                    htmlFor="color"
                    style={{
                        marginRight: 10,
                        marginTop: 5,
                    }}
                >
                    Color
                </label>

                <Select
                    styles={{
                        control: (provided) => ({
                            ...provided,
                            width: 200,
                        }),
                    }}
                    isClearable
                    isSearchable
                    name="color"
                    onInputChange={onInputChange}
                    options={options}
                    filterOption={filterOptions}
                />
            </div>

            <div style={{
                position: 'absolute',
                top: 0,
                right: 0,
            }}>

                <Select
                    name="lang"
                    defaultValue={{value: 'en', label: 'English'}}
                    onChange={(value) => {
                        setLang(value?.value as 'en' | 'he');
                    }}
                    options={[
                        {value: 'he', label: 'Hebrew'},
                        {value: 'en', label: 'English'},
                    ]}
                />
            </div>
        </div>
    );
}

export default App
