import scatterplotdata from '../components/scatterplotdata';

export default function ScatterPlotPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Answer Similarity Analysis</h1>
      <scatterplotdata />
    </div>
  );
}

