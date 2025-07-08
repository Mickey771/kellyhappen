// components/wallet/Requests.tsx
import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { fetchTransactions } from "@/store/reducers/userSlice";

export const Requests = () => {
  const dispatch = useAppDispatch();
  const { transactions, isLoading, error } = useAppSelector(
    (state) => state.user
  );

  const [activeTab, setActiveTab] = useState<"deposits" | "withdrawals">(
    "deposits"
  );

  useEffect(() => {
    dispatch(fetchTransactions());
  }, [dispatch]);

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
      case "approved":
        return "text-green-600 bg-green-100";
      case "pending":
        return "text-yellow-600 bg-yellow-100";
      case "rejected":
      case "failed":
        return "text-red-600 bg-red-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-8">Loading transactions...</div>
    );
  }

  const deposits = transactions?.deposits || [];
  const withdrawals = transactions?.withdrawals || [];

  return (
    <div className="max-w-4xl space-y-4">
      {error && (
        <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      {/* Tab Navigation */}
      <div className="flex gap-4 border-b">
        <button
          onClick={() => setActiveTab("deposits")}
          className={`pb-2 px-1 border-b-2 font-medium ${
            activeTab === "deposits"
              ? "border-black text-black"
              : "border-transparent text-gray-500 hover:text-gray-700"
          }`}
        >
          Deposits ({deposits.length})
        </button>
        <button
          onClick={() => setActiveTab("withdrawals")}
          className={`pb-2 px-1 border-b-2 font-medium ${
            activeTab === "withdrawals"
              ? "border-black text-black"
              : "border-transparent text-gray-500 hover:text-gray-700"
          }`}
        >
          Withdrawals ({withdrawals.length})
        </button>
      </div>

      {/* Deposits Tab */}
      {activeTab === "deposits" && (
        <div className="space-y-3">
          {deposits.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No deposit requests found
            </div>
          ) : (
            deposits.map((deposit: any) => (
              <div
                key={deposit.id}
                className="bg-white border rounded-lg p-4 shadow-sm"
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="font-medium">${deposit.amount} USDT</p>
                    <p className="text-sm text-gray-600">{deposit.network}</p>
                  </div>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                      deposit.status
                    )}`}
                  >
                    {deposit.status}
                  </span>
                </div>
                <div className="text-sm text-gray-500 space-y-1">
                  <p>
                    <span className="font-medium">Wallet:</span>{" "}
                    {deposit.walletAddress}
                  </p>
                  <p>
                    <span className="font-medium">Date:</span>{" "}
                    {formatDate(deposit.createdAt)}
                  </p>
                  {deposit.txHash && (
                    <p>
                      <span className="font-medium">TX Hash:</span>{" "}
                      {deposit.txHash}
                    </p>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Withdrawals Tab */}
      {activeTab === "withdrawals" && (
        <div className="space-y-3">
          {withdrawals.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No withdrawal requests found
            </div>
          ) : (
            withdrawals.map((withdrawal: any) => (
              <div
                key={withdrawal.id}
                className="bg-white border rounded-lg p-4 shadow-sm"
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="font-medium">${withdrawal.amount} USDT</p>
                    <p className="text-sm text-gray-600">
                      {withdrawal.network}
                    </p>
                  </div>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                      withdrawal.status
                    )}`}
                  >
                    {withdrawal.status}
                  </span>
                </div>
                <div className="text-sm text-gray-500 space-y-1">
                  <p>
                    <span className="font-medium">Wallet:</span>{" "}
                    {withdrawal.walletAddress}
                  </p>
                  <p>
                    <span className="font-medium">Date:</span>{" "}
                    {formatDate(withdrawal.createdAt)}
                  </p>
                  {withdrawal.adminNote && (
                    <p>
                      <span className="font-medium">Note:</span>{" "}
                      {withdrawal.adminNote}
                    </p>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};
