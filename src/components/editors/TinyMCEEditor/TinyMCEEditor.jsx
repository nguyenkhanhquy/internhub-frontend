import { useRef } from "react";
import PropTypes from "prop-types";
import { Editor } from "@tinymce/tinymce-react";
import { Controller } from "react-hook-form";

function TinyMCEEditor({ control, name, label, error }) {
    const editorRef = useRef(null);

    return (
        <Controller
            name={name}
            control={control}
            rules={{ required: "Vui lòng nhập giới thiệu công ty" }}
            render={({ field: { onChange, value } }) => (
                <div>
                    <label style={{ marginBottom: "8px", display: "block" }}>
                        {label} <span style={{ color: "red" }}>*</span>
                    </label>
                    <Editor
                        tinymceScriptSrc={"/tinymce/tinymce.min.js"}
                        onInit={(evt, editor) => (editorRef.current = editor)}
                        init={{
                            entity_encoding: "raw",
                            encoding: "UTF-8",
                            license_key: "gpl",
                            promotion: false,
                            branding: false,
                            height: 400,
                            menubar: true,
                            plugins: [
                                "charmap",
                                "searchreplace",
                                "visualblocks",
                                "wordcount",
                                "preview",
                                "code",
                                "lists",
                                "fullscreen",
                            ],
                            toolbar:
                                "undo redo | bold italic underline strikethrough | blocks fontfamily fontsize | align lineheight | checklist numlist bullist indent outdent | removeformat",
                        }}
                        // initialValue="Welcome to TinyMCE!"
                        value={value}
                        onEditorChange={onChange}
                    />
                    {error && (
                        <div style={{ color: "#d32f2f", fontSize: "0.75rem", marginTop: "3px" }}>{error.message}</div>
                    )}
                </div>
            )}
        />
    );
}

TinyMCEEditor.propTypes = {
    control: PropTypes.object.isRequired,
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    error: PropTypes.object,
};

export default TinyMCEEditor;
