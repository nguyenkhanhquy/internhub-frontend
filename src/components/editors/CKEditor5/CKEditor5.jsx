import { useState, useEffect, useRef, useMemo } from "react";
import PropTypes from "prop-types";
import { Controller } from "react-hook-form";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import {
    ClassicEditor,
    Alignment,
    AutoImage,
    AutoLink,
    Autosave,
    BlockQuote,
    Bold,
    CloudServices,
    Essentials,
    FontBackgroundColor,
    FontColor,
    FontFamily,
    FontSize,
    FullPage,
    GeneralHtmlSupport,
    Heading,
    Highlight,
    HorizontalLine,
    HtmlComment,
    HtmlEmbed,
    ImageBlock,
    ImageCaption,
    ImageInline,
    ImageInsertViaUrl,
    ImageResize,
    ImageStyle,
    ImageTextAlternative,
    ImageToolbar,
    ImageUpload,
    Indent,
    IndentBlock,
    Italic,
    Link,
    List,
    ListProperties,
    MediaEmbed,
    Paragraph,
    PasteFromOffice,
    RemoveFormat,
    ShowBlocks,
    SourceEditing,
    SpecialCharacters,
    Strikethrough,
    Table,
    TableCaption,
    TableCellProperties,
    TableColumnResize,
    TableProperties,
    TableToolbar,
    TodoList,
    Underline,
} from "ckeditor5";

import translations from "ckeditor5/translations/vi.js";

import "ckeditor5/ckeditor5.css";

import "./CKEditor5.module.css";

const LICENSE_KEY = "GPL"; // or <YOUR_LICENSE_KEY>.

export default function CKEditor5({ control, name, label, error }) {
    const editorContainerRef = useRef(null);
    const editorRef = useRef(null);
    const [isLayoutReady, setIsLayoutReady] = useState(false);

    useEffect(() => {
        setIsLayoutReady(true);

        return () => setIsLayoutReady(false);
    }, []);

    const { editorConfig } = useMemo(() => {
        if (!isLayoutReady) {
            return {};
        }

        return {
            editorConfig: {
                toolbar: {
                    items: [
                        "sourceEditing",
                        "showBlocks",
                        "|",
                        "heading",
                        "|",
                        "fontSize",
                        "fontFamily",
                        "fontColor",
                        "fontBackgroundColor",
                        "|",
                        "bold",
                        "italic",
                        "underline",
                        "|",
                        "link",
                        "insertTable",
                        "highlight",
                        "blockQuote",
                        "|",
                        "alignment",
                        "|",
                        "bulletedList",
                        "numberedList",
                        "todoList",
                        "outdent",
                        "indent",
                    ],
                    shouldNotGroupWhenFull: false,
                },
                plugins: [
                    Alignment,
                    AutoImage,
                    AutoLink,
                    Autosave,
                    BlockQuote,
                    Bold,
                    CloudServices,
                    Essentials,
                    FontBackgroundColor,
                    FontColor,
                    FontFamily,
                    FontSize,
                    FullPage,
                    GeneralHtmlSupport,
                    Heading,
                    Highlight,
                    HorizontalLine,
                    HtmlComment,
                    HtmlEmbed,
                    ImageBlock,
                    ImageCaption,
                    ImageInline,
                    ImageInsertViaUrl,
                    ImageResize,
                    ImageStyle,
                    ImageTextAlternative,
                    ImageToolbar,
                    ImageUpload,
                    Indent,
                    IndentBlock,
                    Italic,
                    Link,
                    List,
                    ListProperties,
                    MediaEmbed,
                    Paragraph,
                    PasteFromOffice,
                    RemoveFormat,
                    ShowBlocks,
                    SourceEditing,
                    SpecialCharacters,
                    Strikethrough,
                    Table,
                    TableCaption,
                    TableCellProperties,
                    TableColumnResize,
                    TableProperties,
                    TableToolbar,
                    TodoList,
                    Underline,
                ],
                fontFamily: {
                    supportAllValues: true,
                },
                fontSize: {
                    options: [10, 12, 14, "default", 18, 20, 22],
                    supportAllValues: true,
                },
                heading: {
                    options: [
                        {
                            model: "paragraph",
                            title: "Paragraph",
                            class: "ck-heading_paragraph",
                        },
                        {
                            model: "heading1",
                            view: "h1",
                            title: "Heading 1",
                            class: "ck-heading_heading1",
                        },
                        {
                            model: "heading2",
                            view: "h2",
                            title: "Heading 2",
                            class: "ck-heading_heading2",
                        },
                        {
                            model: "heading3",
                            view: "h3",
                            title: "Heading 3",
                            class: "ck-heading_heading3",
                        },
                        {
                            model: "heading4",
                            view: "h4",
                            title: "Heading 4",
                            class: "ck-heading_heading4",
                        },
                        {
                            model: "heading5",
                            view: "h5",
                            title: "Heading 5",
                            class: "ck-heading_heading5",
                        },
                        {
                            model: "heading6",
                            view: "h6",
                            title: "Heading 6",
                            class: "ck-heading_heading6",
                        },
                    ],
                },
                htmlSupport: {
                    allow: [
                        {
                            name: /^.*$/,
                            styles: true,
                            attributes: true,
                            classes: true,
                        },
                    ],
                },
                image: {
                    toolbar: [
                        "toggleImageCaption",
                        "imageTextAlternative",
                        "|",
                        "imageStyle:inline",
                        "imageStyle:wrapText",
                        "imageStyle:breakText",
                        "|",
                        "resizeImage",
                    ],
                },
                // initialData: "CKEditor 5",
                language: "vi",
                licenseKey: LICENSE_KEY,
                link: {
                    addTargetToExternalLinks: true,
                    defaultProtocol: "https://",
                    decorators: {
                        toggleDownloadable: {
                            mode: "manual",
                            label: "Downloadable",
                            attributes: {
                                download: "file",
                            },
                        },
                    },
                },
                list: {
                    properties: {
                        styles: true,
                        startIndex: true,
                        reversed: true,
                    },
                },
                menuBar: {
                    isVisible: true,
                },
                placeholder: "Nhập hoặc dán nội dung của bạn vào đây!",
                table: {
                    contentToolbar: [
                        "tableColumn",
                        "tableRow",
                        "mergeTableCells",
                        "tableProperties",
                        "tableCellProperties",
                    ],
                },
                translations: [translations],
            },
        };
    }, [isLayoutReady]);

    return (
        <div className="main-container">
            <div className="editor-container editor-container_classic-editor" ref={editorContainerRef}>
                <div className="editor-container__editor">
                    <div ref={editorRef}>
                        <Controller
                            name={name}
                            control={control}
                            rules={{ required: "Vui lòng nhập giới thiệu công ty" }}
                            render={({ field: { onChange, value } }) => (
                                <div>
                                    <label style={{ marginBottom: "8px", display: "block" }}>
                                        {label} <span style={{ color: "red" }}>*</span>
                                    </label>
                                    {editorConfig && (
                                        <CKEditor
                                            editor={ClassicEditor}
                                            config={editorConfig}
                                            data={value} // Đặt giá trị khởi tạo
                                            onChange={(event, editor) => {
                                                const data = editor.getData(); // Lấy dữ liệu từ CKEditor
                                                const cleanData = data.replace(/<p>(&nbsp;|\s)*<\/p>/g, "").trim(); // Xóa các thẻ p rỗng
                                                onChange(cleanData); // Đồng bộ với React Hook Form
                                            }}
                                        />
                                    )}
                                    {error && (
                                        <div
                                            style={{
                                                color: "#d32f2f",
                                                fontSize: "0.75rem",
                                                marginTop: "3px",
                                                marginLeft: "12px",
                                            }}
                                        >
                                            {error.message}
                                        </div>
                                    )}
                                </div>
                            )}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

CKEditor5.propTypes = {
    control: PropTypes.object.isRequired,
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    error: PropTypes.object,
};
