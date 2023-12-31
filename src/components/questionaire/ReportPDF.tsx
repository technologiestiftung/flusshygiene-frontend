import React, { useState, useEffect } from "react";
import {
  PDFDownloadLink,
  PDFViewer,
  Font,
  Page as MasterPage,
  Text,
  Link,
} from "@react-pdf/renderer";
import styled from "@react-pdf/styled-components";
import { IAnswer } from "../../lib/common/interfaces";
import { Container } from "../Container";
import { RouteComponentProps } from "react-router";
const fontBold = require("../../assets/fonts/open-sans-v16-latin-600.ttf");
const font = require("../../assets/fonts/open-sans-v16-latin-300.ttf");
const fontItalic = require("../../assets/fonts/open-sans-v16-latin-300italic.ttf");

// Supported components for styled
//     Document
//     Page
//     View
//     Image
//     Text
//     Link

const Document = styled.Document`
  font-family: "Open Sans";
`;
const Page = styled.Page`
  flex-direction: "row";
  // background-color: red;
`;

Font.register({
  family: "Open Sans Bold",
  src: fontBold,
  format: "truetype",
});
Font.register({
  family: "Open Sans",
  src: font,
  format: "truetype",
});
Font.register({
  family: "Open Sans Italic",
  src: fontItalic,
  format: "truetype",
});
const View = styled.View`
  margin: 5vw;
  padding: 5vh;
  flex-grow: 1;
`;

const Title = styled.Text`
  text-align: center;
  font-size: 24pt;
  font-weight: 600;
  font-family: "Open Sans Bold";
  padding-bottom: 15pt;
`;
const SubTitle = styled.Text`
  text-align: center;
  font-size: 16pt;
  font-weight: 300;
  font-family: "Open Sans Italic";
  padding-bottom: 15pt;
`;

const QuestionText = styled.Text`
  border-top: 1px dashed gray;
  text-align: left;
  font-size: 13pt;
  font-weight: 600;
  font-family: "Open Sans Bold";
  padding-bottom: 15pt;
`;

const AnswerText = styled.Text`
  font-size: 12pt;
  padding-bottom: 13pt;
`;

const TextItalic = styled.Text`
  font-size: 12pt;
  font-family: "Open Sans Italic";
  padding-bottom: 13pt;
`;

interface IPDFReportProps {
  questions?: string[];
  answers?: IAnswer[];
  addInfoQuestion?: string[];
  title?: string;
  probability?: string;
  allAnswersGiven?: boolean;
}

interface IPDFReportRendererProps extends IPDFReportProps {
  children?: React.ReactNode;
}

export const createPDFLinks: (text: string | null | undefined) => any = (
  text,
) => {
  if (text === undefined || text === null) {
    return <Text></Text>;
  }

  const reg2 = /<a.*?href="|".*?<\/a>/;
  const matches = text.split(reg2);

  const arr = matches.map((item) => {
    if (item.startsWith("http")) {
      return <Link src={item}>{"Link"}</Link>;
    } else {
      return <Text>{item}</Text>;
    }
  });
  return (
    <Text>
      {arr.map((item, i) => (
        <React.Fragment key={i}>{item}</React.Fragment>
      ))}
    </Text>
  );
};

const ReportPDF: React.FC<IPDFReportProps> = ({
  questions,
  answers,
  addInfoQuestion,
  title,
  probability,
  allAnswersGiven,
}) => {
  return (
    <Document>
      <Page size="A4">
        <View>
          <Title>{title}</Title>
          <SubTitle>{probability}</SubTitle>
          {allAnswersGiven === true && (
            <SubTitle>
              Achtung! Es wurden nicht alle Fragen beantwortet
            </SubTitle>
          )}
        </View>
      </Page>
      {questions !== undefined &&
        questions.length > 0 &&
        questions.map((ele, i) => {
          return (
            <MasterPage size={"A4"} key={i}>
              <View>
                {/* <React.Fragment key={i}> */}
                <QuestionText>
                  {i + 1}
                  {"."}
                  {ele}
                </QuestionText>
                {(addInfoQuestion && addInfoQuestion[i] !== null) ||
                  (addInfoQuestion && addInfoQuestion[i] !== undefined && (
                    <TextItalic>
                      {createPDFLinks(addInfoQuestion[i])}
                    </TextItalic>
                  ))}

                {(() => {
                  let res: JSX.Element = (
                    <AnswerText key={`${i}not`}>
                      Noch nicht beantwortet
                    </AnswerText>
                  );
                  if (answers) {
                    for (const answer of answers) {
                      const split = answer.id.split("-");
                      const aid = parseInt(split[0], 10);
                      if (i + 1 === aid) {
                        const parsedAnswerAddText = createPDFLinks(
                          answer.additionalText,
                        );

                        res = (
                          <React.Fragment key={`${i}yes`}>
                            <AnswerText key={answer.id}>
                              {answer.text}
                            </AnswerText>
                            {/* <TextItalic>{answer.additionalText}</TextItalic> */}
                            <TextItalic>{parsedAnswerAddText}</TextItalic>
                          </React.Fragment>
                        );
                      }
                    }
                  }
                  return res;
                })()}
              </View>
            </MasterPage>
          );
        })}
    </Document>
  );
};

export const PDFPage: React.FC<RouteComponentProps> = (props) => {
  return (
    <Container
      containerClassName={"container__pdf--fullpage"}
      columnClassName={"pdfviewer__parent"}
    >
      <PDFRendererViewer {...props.location.state}></PDFRendererViewer>
    </Container>
  );
};
export const PDFRendererViewer: React.FC<IPDFReportRendererProps> = (props) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
    setOpen(true);
    return () => setOpen(false);
  }, []);

  return (
    <>
      {open && (
        <PDFViewer
          width="100%"
          className={"pdfviewer"}
          style={{
            height: "100%",
          }}
        >
          <ReportPDF {...props}></ReportPDF>
        </PDFViewer>
      )}
    </>
  );
};

export const PDFRendererDLLink: React.FC<IPDFReportRendererProps> = (props) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
    setOpen(true);
    return () => setOpen(false);
  }, []);

  return (
    <>
      {open && (
        <PDFDownloadLink
          document={<ReportPDF {...props} />}
          fileName={`report-${new Date()
            .toISOString()
            .replace(/:|\./g, "-")}.pdf`}
        >
          {({ blob, url, loading, error }) =>
            loading ? "Loading document..." : "Download now!"
          }
        </PDFDownloadLink>
        // <PDFViewer width={600} height={450}>
        //   <Document>
        //     <Page size='A4'>
        //       <View style={styles.section}>
        //         <Text>Hello World</Text>
        //       </View>
        //     </Page>
        //   </Document>
        // </PDFViewer>
      )}
    </>
  );
};
