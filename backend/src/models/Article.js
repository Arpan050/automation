import { Schema } from "mongoose";

const articleSchema = new Schema(
    {
        title: {type: String,
            required: true,
        },
        OriginalContent: {
            type: String,
            required: true,
        },
        updatedContent:{
            type: String,
            required: true,
        },
        sourceUrl:{
            type: String,
            required: true,
        },
        reference:{
            type: [String],
            default:[],
        },

    },
    {timestamps: true}
);

const Article = mongoose.model("Article", articleSchema);

export default Article;