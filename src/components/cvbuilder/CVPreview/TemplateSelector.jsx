import PropTypes from "prop-types";

const TemplateSelector = ({ selectedTemplate, onSelectTemplate }) => {
    const templates = [
        { id: "classic", name: "Cổ điển", description: "Mẫu CV truyền thống, chuyên nghiệp" },
        { id: "modern", name: "Hiện đại", description: "Mẫu CV hiện đại với thiết kế sạch sẽ" },
        { id: "creative", name: "Sáng tạo", description: "Mẫu CV độc đáo, nổi bật" },
    ];

    return (
        <div className="mb-6">
            <h2 className="mb-3 text-lg font-semibold text-gray-700">Chọn mẫu CV</h2>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                {templates.map((template) => (
                    <div
                        key={template.id}
                        onClick={() => onSelectTemplate(template.id)}
                        className={`cursor-pointer rounded-lg border p-4 transition-all ${
                            selectedTemplate === template.id
                                ? "border-blue-500 bg-blue-50 shadow-md"
                                : "border-gray-200 hover:border-blue-300 hover:bg-gray-50"
                        }`}
                    >
                        <div className="mb-2 flex items-center">
                            <div
                                className={`mr-2 h-4 w-4 rounded-full ${
                                    selectedTemplate === template.id ? "bg-blue-500" : "bg-gray-300"
                                }`}
                            ></div>
                            <h3 className="font-medium text-gray-800">{template.name}</h3>
                        </div>
                        <p className="text-sm text-gray-600">{template.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

TemplateSelector.propTypes = {
    selectedTemplate: PropTypes.string.isRequired,
    onSelectTemplate: PropTypes.func.isRequired,
};

export default TemplateSelector;
